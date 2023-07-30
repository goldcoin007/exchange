
let config = {};
if (process.env.NODE_ENV == 'production'||true) { //生产环境
    config = {

        baseUrl: 'https://jsdjf.vjdsieuh',
        // 图片地址 （暂时无用）
        imgUrl: 'https://jsdjf.vjdsieuh',
        socketUrl: 'wss://jsdjf.vjdsieuh/ws1',
        socketUrl1: 'wss://jsdjf.vjdsieuh/ws2',
        pcUrl:'https://jsdjf.vjdsieuh',
        appName: ' ',
        version: '1.0.0',
        mobile: 'https://jsdjf.vjdsieuh',
        down:"#"
    };
} else { 
    config = {
        baseUrl: 'http://jsdjf.vjdsieuh',
        imgUrl: 'http://jsdjf.vjdsieuh/upload',
        socketUrl: 'ws://jsdjf.vjdsieuh:2346/',
        socketUrl1: 'ws://jsdjf.vjdsieuh/',

        pcUrl:'http://jsdjf.vjdsieuh',

        appName: '本地开发',

        version: '0.0.0',

        mobile: ''
    }
    // config = {
    //     // ajax地址
    //     baseUrl: 'https://server.7coin.in',
    //     // 图片地址 （暂时无用）
    //     imgUrl: 'https://server.7coin.in/upload',
    //     // socket地址
    //     socketUrl: 'wss://server.7coin.in:2346/',
    //     socketUrl1: 'wss://server.7coin.in:2348/',
    //     // pc端地址
    //     pcUrl:'https://www.7coin.in',
    //     // app名称
    //     appName: '7COIN test',
    //     // 版本
    //     version: '1.0.0',
    //     // 移动端地址
    //     mobile: 'https://h5.7coin.in'
    // };
}
export default config;