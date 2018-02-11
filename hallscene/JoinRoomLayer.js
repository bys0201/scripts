// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        layout_JoinRoom: cc.Node,
        btnNum: { default: null, type: cc.Button },
        LabelAtlas: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        module.exports.roomId = "";
    },

    start () {
    },

    //点击数字按钮
    onClickNumBtn: function ( event, customEventData ) {
        cc.log("JoinRoomLayer customEventData=" + customEventData);
        let roomId = module.exports.roomId;
        let len = roomId.length
        if (len < 6) {
            roomId = roomId + customEventData;
            module.exports.roomId = roomId;
            cc.log("JoinRoomLayer onclick after roomId=" + roomId);
            this.showRoomId();
            if (roomId.length == 6) {
                cc.log("JoinRoomLayer 加入房间roomId=" + roomId);
            };
        };
    },

    //重置
    onReset: function() {
        module.exports.roomId = "";
        this.showRoomId();
        cc.log("JoinRoomLayer reset after roomId=nil");
    },

    //删除
    onDelete: function() {
        let roomId = module.exports.roomId;
        roomId = roomId.substring(0, roomId.length-1);
        module.exports.roomId = roomId;
        this.showRoomId();
        cc.log("JoinRoomLayer delete after roomId=" + roomId);
    },

    showRoomId: function() {
        // let label = cc.find("LabelAtlas");
        let label = this.LabelAtlas;
        if(label){
            label.string = module.exports.roomId;
        };
    },
    // update (dt) {},
});
