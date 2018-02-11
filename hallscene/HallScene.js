// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

require('hall_init')

cc.Class({
    extends: cc.Component,

    properties: {
        layout_JoinRoom: cc.Node
    },

    onLoad () {
        this.init();
    },

    start () {
    },

    init: function() {
    },
    
    OpenJoinRoomLayer: function() {
        cc.log("打开加入房间界面。");
        var prefabPath = 'layout_JoinRoom';
        let onResourceLoaded = function (errorMessage, loadedResource) {
            cc.log("回到这里面没有？？？？");
            if(errorMessage){
                cc.log("载入" + errorMessage + "失败");
                return;
            };
            cc.log("回到这里面没有 111？？？？" + loadedResource);
            if (!(loadedResource instanceof cc.Prefab)) {
                cc.log('你載入的不是Prefab, 你做了什麼事?');
                return;
            };
            cc.log("回到这里面没有 222？？？？" + loadedResource);
            var CanvasNode = cc.find('Canvas');
            var node = cc.instantiate(loadedResource);
            node.setPosition(0, 0);
            CanvasNode.addChild(node);
        };
        cc.loader.loadRes(prefabPath, onResourceLoaded);
    }

    // update (dt) {},
});
