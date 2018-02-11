
// --------------------------------------------------------
// Title:       消息过滤器基类
// Author:      csh
// LastDate:    2018.02.10
// LastContent: 消息过滤器基类
// Copyright(c) ly Entertainment All right reserved.
// --------------------------------------------------------
export default class IMsgFilter{

    //主码集
    getMainCmd() {
        return [];
    }

    //子码集
    getSubCmd() {
        return [];
    }

    //判断主码是否存在
    isHasMainCmd (mainCmd) {
        var all = this.getMainCmd();
        for (const i in all) {
            if (all.hasOwnProperty(i)) {
                const element = all[i];
                if (element == mainCmd) {
                    return true;
                }
            }
        }
        return false;
    }

    //判断子码是否存在
    isHasSubCmd (subCmd) {
        var all = this.getSubCmd();
        for (const i in all) {
            if (all.hasOwnProperty(i)) {
                const element = all[i];
                if (element == subCmd) {
                    return true;
                }
            }
        }
        return false;
    }

    //解析数据
    decode(mainCmd, subCmd, data) {
    }
};