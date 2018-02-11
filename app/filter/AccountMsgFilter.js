// --------------------------------------------------------
// Title:       平台消息过滤器
// Author:      csh
// LastDate:    2018.02.10
// LastContent: 平台消息过滤器
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
let bytebuffer = require('bytebuffer');

import CMD from "CMD";
import IMsgFilter from "IMsgFilter";

class AccountMsgFilter extends IMsgFilter {
    getMainCmd(){
        return [100];
    }

    getSubCmd() {
        return [1002];
    }

    decode (mainCmd, subCmd, data) {
        cc.log("decode CMD.Account=" + CMD.Account);
        let msgData = null;
        if (mainCmd == CMD.Account) {
            switch (subCmd) {
                case CMD.LoginRsp:
                    msgData = this.onNetMsgLoginResp(data);
                    break;
                default:
                    break;
            }
        }
        return msgData;
    }

    onNetMsgLoginResp(data) {
        let temp = {};
        let p = new bytebuffer(data);
        temp.uid = p.readInt32();
        temp.dismonds = p.readInt32();
        temp.jinbi = p.readInt32();
        temp.sex = p.readInt16();
        temp.ipaddress = p.readInt32();
        temp.extencode = p.readInt32();
        temp.sign = p.readString();
        temp.actorurl = p.readString();
        temp.uname = p.readString();
        cc.log(JSON.stringify(temp));
        return temp;
    }
};

module.exports = function(){
    return new AccountMsgFilter();
};