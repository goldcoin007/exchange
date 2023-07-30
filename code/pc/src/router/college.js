
import Index from '@/views/college'; 
import Detail from '@/views/college/detail'; 
import List from '@/views/college/list'; 

export default [
    {
        name: "college",
        path: "/college", // 博客首页
        component: Index
    },
    {
        name: "college-list",
        path: "/college/list/:cid", // 博客列表页
        component: List
    },
    {
        name: "college-detail",
        path: "/college/detail/:cid?/:aid?", // 博客详情页
        component: Detail
    }
]