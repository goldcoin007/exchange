import Serve from '@/api/serve'

class College {
    static college(data) {
        return Serve.get(`/college`,data);
    }

    static getArticleList(data) {
        return Serve.get(`/articleList`,data);
    }

    static getCategoryList() {
        return Serve.get(`/categoryList`);
    }

    static getArticleDetail(data) {
        return Serve.get(`/article/detail`,data);
    }

    static getRecommend() {
        return Serve.get(`/recommend`);
    }
}

export default College;