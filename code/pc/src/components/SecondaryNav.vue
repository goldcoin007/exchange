<template>
<div>
    <div class="SecondaryNav" :class="{navBarWrap : criticalPos}">
        <div class="SecondaryNavWidth">
            <ul class="SecondaryNavUl">
                <li class="SecondaryNavList" v-for="(item,index) in itemList" :key="index">
                    <router-link :to="item.url" active-class="SecondaryNavActive">{{item.label}}</router-link>
                </li>
            </ul>
        </div>
    </div>
    <div v-if="isHolder" class="holder"></div>
</div>
</template>

<script>
import College from "@/api/college";

export default {
    name: "SecondaryNav",
    data() {
        return {
            criticalPos: false,
            isHolder: false,
            itemList: [], // 菜单项目列表
        }
    },

    methods: {
        getWalletLinks() {
            this.itemList = [{
                    url: `/wallet/assets/exchange`,
                    label: this.$t('common.assets'),
                }, 
                {
                    url: `/wallet/assets/contract`,
                    label: this.$t('common.contractaccount'),
                },
                //  {
                //     url: `/wallet/otc`,
                //     label: this.$t('otc.j1'),
                // },
                 {
                    url: `/wallet/transfer`,
                    label: this.$t('common.transferFunds'),
                },
                //  {
                //     url: `/wallet/reward`,
                //     label: this.$t('common.myCommission'),
                // }, 
                {
                    url: `/wallet/funding`,
                    label: this.$t('common.rechargeWithdraw')
                },{
                    url: `/wallet/address`,
                    label: this.$t('common.addressManagement'),
                }
            ];
        },

        getProfileLinks() {
            this.itemList = [{
                url: `/profile/index`,
                label: this.$t('common.accountInformation'),
            }, {
                url: `/profile/certification`,
                label: this.$t('common.auth')
            }, {
                url: `/profile/invite`,
                label: this.$t('common.invitationReward')
            }, 
            // {
            //     url: `/profile/login-history`,
            //     label: this.$t('common.visitHistory')
            // }
            ]
        },


        getOrderLinks() {
            this.itemList = [{
                    url: `/order/exchange`,
                    label: this.$t('common.spotConsignment'),
                },
                // {
                //     url: `/order/option`,
                //     label: this.$t('common.optionOrders'),
                // },
                // {
                //     url: `/order/contract/swap`,
                //     label: this.$t('common.perpetualContract'),
                // },
                // {
                //     url: `/order/contract/forex`,
                //     label: this.$t('common.foreignContract'),
                // }
            ]
        },

        getCollegeLinks() {
            College.getCategoryList().then(list => {
                list.forEach(item => {
                    this.itemList.push({
                        url : `/college/list/${item.id}`,
                        label : item.name
                    })
                })
            }).catch(err => {});
           
        },

        getServiceLink() {
            College.getServiceList().then(list => {
                list.forEach(item => {
                    this.itemList.push({
                        url : `/service/${item.id}`,
                        label : item.name
                    })
                })
            }).catch(err => {});
        },
        getOtcList(){
             this.itemList = [
                {
                    url: `/otc/index`,
                    label: this.$t('otc.j8'),
                },
                {
                    url: `/otc/order`,
                    label: this.$t('otc.j7'),
                },
                {
                    url: `/otc/ad`,
                    label: this.$t('otc.j6'),
                },
                {
                    url: `/otc/pays`,
                    label: this.$t('otc.c8'),
                },
            ]
        },
        hideMenu() {

            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            //当滚动超过50时，实现吸顶效果（导航高度为50）
            if (scrollTop > 50) {

                this.criticalPos = true;
                this.isHolder = true;

            } else {
                this.isHolder = false;
                this.criticalPos = false;

            }
        }
    },

    created() {

        // 查看当前路由
        let path = this.$route.path.slice(1);

        switch (true) {
            case path.startsWith('wallet'): // 钱包页面
                this.getWalletLinks();
                break;

            case path.startsWith('profile'): // 账户中心
                this.getProfileLinks();
                break;

            case path.startsWith('order'): // 订单记录
                this.getOrderLinks();
                break;


            case path.startsWith('college'): // 学院
                this.getCollegeLinks();
                break;

            case path.startsWith('service') : // 服务
                this.getServiceLink();
                break;
            case path.startsWith('otc') : // otc
                this.getOtcList();
                break;
        }
    },

    mounted() {
        window.addEventListener("scroll", _.throttle(this.hideMenu, 200)); //监听滚动事件
    },

};
</script>

<style lang="scss" scoped>
.SecondaryNav {
    width: 100%;
    height: 50px;

    @include flexible(row, center, center);
    // background: #f5f9fc;
    background : #222e3d;

    .SecondaryNavWidth {
        width: 1280px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.holder {
    width: 100%;
    height: 50px;
    background: #f5f9fc;
}

.navBarWrap {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
}

.SecondaryNavUl {
    display: flex;
    height: 100%;

    .SecondaryNavList {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        height: 100%;

        a {
            font-weight: 500;
            color: rgba(193, 187, 242, 1);
            width: 100%;
            height: 100%;
            // border: 1px solid red;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .SecondaryNavActive {
            position: relative;
            // color: @clr;

            &::after {
                content: '';
                width: 100%;
                height: 2px;
                position: absolute;
                bottom: 0;
                left: 0;
                background: linear-gradient(135deg, rgba(188, 106, 188, 1) 0%, rgba(104, 86, 166, 1) 100%);
            }
        }
    }

}
</style>
