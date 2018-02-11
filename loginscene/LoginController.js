// --------------------------------------------------------
// Title:       登录控制器
// Author:      biys
// LastDate:    2018.02.10
// LastContent: 登录控制器
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
import CMD from 'CMD';
import GlobalEvent from "GlobalEvent";
import Facade from "Facade";
import IController from "IController";

let Test= require('Test')

class LoginController extends IController {

    constructor(){
        super();
        let enterLoginScene = function () {
            cc.director.loadScene('LoginScene');
        };
        Facade.event(GlobalEvent.SCENE_ENTER_LOGIN, enterLoginScene);
    };

    onDataRecv(mainCmd, subCmd, data) {
        if (mainCmd == CMD.Account) {
            switch (subCmd) {
                case CMD.LoginRsp:
                    cc.log("登录成功，进入大厅。");
                    cc.log("登录成功，进入大厅。" + Test.AA);
                    Facade.dispatch(GlobalEvent.SCENE_ENTER_HALL);
                    break;
            }
        }
    }
}

let mInstance = null;
module.exports = function () {
    if (!mInstance){
        mInstance = new LoginController();
    }
    return mInstance;
}