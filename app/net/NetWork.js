// --------------------------------------------------------
// Title:       网络中转件
// Author:      biys
// LastDate:    2018.02.10
// LastContent: 网络中转件
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
import GlobalEvent from "GlobalEvent";
import Facade from "Facade";

let BBSocket    = require('BBSocket');
let AccountMsgFilter = require('AccountMsgFilter');

function NetWork() {
    this.mSocket;
    this.mFilters = new Array();
    this.mControllers = new Array();
    this.registerFilter(new AccountMsgFilter());
    let self = this;

    Facade.event(GlobalEvent.BBSOCKET_MESSAGE_RECV, function(event) {
        let data = event.getUserData();
        self.recv(data);
    });
};

NetWork.prototype = {
    connect: function () {
        if (!this.mSocket || this.mSocket.getConnectCode() != 2){
            let wsUrl = 'ws://1645d6g435.imwork.net:20000';
            cc.log("NetWork connect url=" + wsUrl);
            this.mSocket = new BBSocket(wsUrl);
        }
    },

    send: function (data) {
        if (this.mSocket && this.mSocket.getConnectCode() == 1) {
            this.mSocket.send(data);
            cc.log("NetWork send data=" + data);
        }
    },

    recv: function (eventdata) {
        let mainCmd = eventdata.mainCmd;
        let subCmd = eventdata.subCmd;
        let data = eventdata.data;
        cc.log("mainCmd="+mainCmd+", subCmd="+subCmd);
        let msgData = null;
        for (const i in this.mFilters) {
            if (this.mFilters.hasOwnProperty(i)) {
                const filter = this.mFilters[i];
                if (filter.isHasMainCmd(mainCmd) && filter.isHasSubCmd(subCmd)) {
                    msgData = filter.decode(mainCmd, subCmd, data);
                }
            }
        }
        if (msgData){
            for (const i in this.mControllers) {
                if (this.mControllers.hasOwnProperty(i)) {
                    const controller = this.mControllers[i];
                    controller.onDataRecv(mainCmd, subCmd, msgData);
                }
            }
        }
    },

    registerFilter: function( filter ) {
        this.mFilters.push(filter);
    },

    unregisterFilter: function( filter ) {
        this.mFilters.pop(filter);
    },

    registerController: function(controller) {
        this.mControllers.push(controller);
    },

    unregisterController: function(controller) {
        this.mControllers.pop(controller);
    },
};

let mInstance = null;
module.exports = function () {
    if (!mInstance) {
        mInstance = new NetWork();
    }
    return mInstance;
};
