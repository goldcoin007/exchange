import server from './server'

class College {
    static college() {
        return server.get(`/college`);
    }

    static getArticleList(cid) {
        return server.get(`/articleList?id=${cid}`);
    }

    // 学院分类列表
    static getCategoryList() {
        return server.get(`/categoryList`);
    }

    // 服务分类列表
    static getServiceList() {
        return server.get(`/services`);
    }

    static getArticleDetail(aid) {
        return server.get(`/article/detail?id=${aid}`);
    }
    
    // 获取服务的文章详情
    static getServiceDetail(cid) {
        return server.get(`/article/serviceDetail?id=${cid}`);
    }

    static getRecommend() {
        return server.get(`/recommend`);
    }
}

export default College;