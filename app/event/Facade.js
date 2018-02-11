// --------------------------------------------------------
// Title:       事件分发器
// Author:      biys
// LastDate:    2018.02.10
// LastContent: 事件分发器
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
export default class Facade {
    
    static event(eventname, callf) {
        let listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: eventname,
            callback: callf,
        });
        cc.eventManager.addListener(listener, 1);
        return listener;
    }

    static bind (eventname, callf, node) {
        let listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: eventname,
            callback: callf,
        });
        cc.eventManager.addListener(listener, node);
    }

    static dispatch (eventname, userdata) {
        let event = new cc.EventCustom(eventname);
        event.setUserData(userdata);
        cc.eventManager.dispatchEvent(event);
    }

    static remove (listener) {
        cc.eventManager.removeListener(listener);
    }
};
