let app = {
    baseUrl:'/api/',
    wsUrl:'wss://guanli.coin.amatak.net:2346',
}

if(process.env.NODE_ENV=='production'){
    app.wsUrl='wss://guanli.coin.amatak.net:2346'
    app.baseUrl='https://guanli.coin.amatak.net/api/'
}

export default app;