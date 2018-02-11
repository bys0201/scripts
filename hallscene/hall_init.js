
let HallController = require('HallController')

let NetWork = require('NetWork')
let mNetWork = new NetWork();
mNetWork.registerController(new HallController());

cc.log("大厅初始化。");