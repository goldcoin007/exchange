export default {

    install(Vue, options) {
        let isProduct = process.env.NODE_ENV == 'production' ? true : false;
        Vue.prototype.Globals = {
            Status: {
                // 充提记录
                Funding: {
                    PENDING: 0, // 审核中
                    SUCCESS: 1, // 成功
                    FAIL: 2, // 失败
                },
                Transfer : {
                    SUCCESS : 1,
                    FAIL : 2,
                }
            },
            mobileUrl:'https://h5.coin.amatak.net',
            Server: {
                Path: {
                    // API: isProduct ? `http://qkladmin2.ruanmeng.top/api/` : `/api/`,
                    BASE:isProduct?`https://guanli.coin.amatak.net`:`https://guanli.coin.amatak.net`,
                    API: isProduct ? `https://guanli.coin.amatak.net/api/` : `/api/`,
                    // WS: isProduct ? `ws://qkladmin2.ruanmeng.top:2346` : `ws://qkladmin2.ruanmeng.top:2346`,
                    // WS1: isProduct ? `ws://qkladmin2.ruanmeng.top:2348` : `ws://qkladmin2.ruanmeng.top:2348`,
                    WS: isProduct ? `wss://guanli.coin.amatak.net/ws1` : `wss://guanli.coin.amatak.net/ws1`,
                    WS1: isProduct ? `wss://guanli.coin.amatak.net/ws2` : `wss://guanli.coin.amatak.net/ws2`,
                }
            }
        };

    }

}