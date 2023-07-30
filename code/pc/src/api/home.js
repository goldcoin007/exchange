
import server from './server';

class Home {
    // 获取大部分数据
    static indexList(){
        return server.get('/indexList')
    }
    // 获取自选数据
    static getCollect(){
        return server.get('/getCollect')
    }

    /**
     * 添加自选
     * @param {object} data
     * @param {string} data.pair_id
     * @param {string} data.pair_name
    */
    static option(data){
        return server.post('/option',data)
    }
    /**
     * 获取版本号
    */
   static getNewestVersion(){
       return server.get('/getNewestVersion')
   }
   
}

export default Home;