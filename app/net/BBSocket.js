// --------------------------------------------------------
// Title:       网络底层
// Author:      csh
// LastDate:    2018.02.10
// LastContent: 网络底层
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
let bytebuffer  = require('bytebuffer');
// let worldpb     = require('worldpb');

import GlobalEvent from "GlobalEvent";
import Facade from "Facade";

let CONNECT_STATUS = cc.Enum({
    _ConnectDefault: 0,
    _ConnectSucc: 1,
    _Connecting: 2,
    _ConnectFailed: 3,
});

function BBSocket(host) {
    this.ws =  new WebSocket(host);
    this.ws.binaryType = "arraybuffer";
    this.ws.onmessage = this.message.bind(this);
    this.ws.onopen = this.connected.bind(this);
    this.ws.onerror = function(e) {
        cc.log(e);
    };
    this.ws.onclose = function(e){
        cc.log(e);
    };
    this.connectCode = CONNECT_STATUS._Connecting;
}

BBSocket.prototype = {
    connected() {
        cc.log('服务器连接成功。');
        this.connectCode = CONNECT_STATUS._ConnectSucc;
    },

    message(event) {
        let now = new Date();
        cc.log('recv ' + event.data.byteLength);
        let p = new bytebuffer(event.data);
        let m = p.readInt16();
        let s = p.readInt16();
        cc.log(m + ' ' + s);
        this.handleMessage(m, s, event.data.slice(4));
    },

    send(data) {
        this.ws.send(data);
    },

    handleMessage(mainCmd, subCmd, data) {
        Facade.dispatch(GlobalEvent.BBSOCKET_MESSAGE_RECV, { mainCmd, subCmd, data });
    },

    getConnectCode: function() {
        return this.connectCode;
    },
    
}

let mInstance = null;
module.exports = function (host) {
    if (!mInstance) {
        mInstance = new BBSocket(host);
    }
    return mInstance;
};
