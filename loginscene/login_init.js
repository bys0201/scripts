
let LoginController = require('LoginController')

let NetWork = require('NetWork')
let mNetWork = new NetWork();
mNetWork.registerController(new LoginController());

cc.log("登录初始化。");