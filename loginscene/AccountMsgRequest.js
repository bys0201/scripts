// --------------------------------------------------------
// Title:       平台消息请求
// Author:      biys
// LastDate:    2018.02.10
// LastContent: 平台消息请求
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
let NetWork     = require('scripts/app/net/NetWork');
let bytebuffer  = require('bytebuffer');

import CMD from "CMD";

let mNetWork = new NetWork();

export default class AccountMsgRequest {

    static connect() {
        cc.log("请求连接网络。");
        mNetWork.connect();
    }

    static sendLoginReq(token) {
        cc.log("发送登录请求。");
        let p = new bytebuffer(64);
        p.writeInt16(CMD.Account);
        p.writeInt16(CMD.LoginReq);
        p.writeString(token);
        mNetWork.send(p.bytes());
    }
}