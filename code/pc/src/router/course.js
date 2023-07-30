
import course from '@/views/course'; 
import detail from '@/views/course/detail'; 
import list from '@/views/course/list'; 

export default [
    {
        name: "course",
        path: "/course", // 博客首页
        component: course
    },
    {
        name: "course-list",
        path: "/course/list/:id", // 博客列表页
        component: list
    },
    {
        name: "course-detail",
        path: "/course/detail", // 博客详情页
        component: detail
    }
]