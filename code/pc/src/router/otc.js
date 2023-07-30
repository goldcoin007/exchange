import Index from "@/views/otc/index";
import detail from "@/views/otc/detail";
import order from "@/views/otc/order";
import ad from "@/views/otc/ad";
import pays from "@/views/otc/pays";
export default [{
        path: '/otc',
        redirect: '/otc/index'
    }, {
        name: "otc",
        path: "/otc/index",
        component: Index
    },
    {
        name: "otcDetail",
        path: "/otc/detail",
        component: detail
    },
    {
        name: "otcOrder",
        path: "/otc/order",
        component: order
    },
    {
        name: "otcAd",
        path: "/otc/ad",
        component: ad
    },
    {
        name: "otcPays",
        path: "/otc/pays",
        component: pays
    }
]