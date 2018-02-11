// --------------------------------------------------------
// Title:       登录场景
// Author:      biys
// LastDate:    2018.02.10
// LastContent: 登录场景
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
require('login_init');

import AccountMsgRequest from 'AccountMsgRequest';

cc.Class({
    extends: cc.Component,

    properties: {
        button_login_youke: cc.Node,
        button_login_wx: cc.Node
    },

    onLoad () {
        AccountMsgRequest.connect();
    },

    start () {
    },

    loginYouke: function() {
        cc.log('loginYouke');
        AccountMsgRequest.sendLoginReq("100000");
    },

    loginWX: function() {
        cc.log('loginWX');

        // cc.director.loadScene('HallScene');
    },
    // update (dt) {},
});
