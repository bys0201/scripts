// --------------------------------------------------------
// Title:       网络协议
// Author:      biys
// LastDate:    2018.02.10
// LastContent: 网络协议
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
export default class CMD {
    static unused = 0;
    // main
    static Account = 100;
    static Room = 101;
    static Game = 102;

    // sub
    static ErrorCode = 1000;
    static LoginReq = 1001;
    static LoginRsp = 1002;

    static CreateRoomReq = 1003;      //--创建房间
    static CreateRoomRsp = 1004;      //--创建房间

    static EnterRoomReq = 1005;      //--进入房间
    static EnterRoomRsp = 1006;      //--进入房间
    static EnterRoomEvent = 1007;      //--进入房间事件通知，用于通知房间的其他玩家

    static QuitRoomReq = 1008;      //--离开房间请求
    static QuitRoomEvent = 1009;      //--离开房间事件通知，用于通知房间的其他玩家

    static ReadyReq = 1010;      //--玩家准备请求
    static ReadyEvent = 1011;      //--玩家准备时间通知，用于通知房间的其他玩家

    // ----- Game----
    static SUB_S_GAME_START = 100;       //--开始游戏
    static SUB_S_OUT_CARD = 101;       //--出牌命令
    static SUB_S_SEND_CARD = 102;       //--发送牌
    static SUB_S_ACTION_NOTIFY = 103;       //--操作提示
    static SUB_S_ACTION_RESULT = 104;       //--操作命令
    static SUB_S_GAME_END = 105;       //--游戏结束

    static SUB_C_OUT_CARD = 1;         //--出牌命令
    static SUB_C_ACTION_CARD = 2;         //--玩家操作
};
