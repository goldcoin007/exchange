
import Serve from '@/api/serve/index'

class Home {
    // 获取大部分数据
    static indexList(data,config){
        return Serve.get('/indexList',data,config)
    }
    // 获取自选数据
    static getCollect(){
        return Serve.get('/getCollect')
    }

    /**
     * 添加自选
     * @param {object} data
     * @param {string} data.pair_id
     * @param {string} data.pair_name
    */
    static option(data){
        return Serve.post('/option',data)
    }
}

export default Home;