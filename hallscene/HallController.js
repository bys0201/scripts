// import CMD from "CMD";
import GlobalEvent from "GlobalEvent";
import Facade from "Facade";
import IController from "IController";

class HallController extends IController{

    constructor(){
        super();
        let enterHallScene = function () {
            cc.director.loadScene('HallScene');
        };
        Facade.event(GlobalEvent.SCENE_ENTER_HALL, enterHallScene);
    }

    onDataRecv(mainCmd, subCmd, data) {

    }

};

let mInstance = null;
module.exports = function () {
    if (!mInstance){
        mInstance = new HallController();
    }
    return mInstance;
}