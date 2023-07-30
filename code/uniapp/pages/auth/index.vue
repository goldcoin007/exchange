<template>
    <view class="layout-page" :style="themeStyle">
        <v-header :title="$t('auth.a0')"></v-header>
        <view class="rounded-md overflow-hidden m-lg bg-panel-3 box-shadow">
            <v-link  to="/pages/auth/primary" class="d-flex align-center p-md  border-b link-active ">
                <view class="flex-fill color-light fn-lg">
                    {{$t('auth.a1')}}
                </view>
                <view class="status" v-if="detail.primary_status==0">
                    <van-icon class="fn-middle" name="info-o" />
                    {{$t('auth.a2')}}
                </view>
                <view class="status color-buy" v-else>
                    <van-icon class="fn-middle" name="passed" />
                    {{$t('auth.a3')}}
                </view>
                <van-icon class="m-l-xs" name="arrow" />
            </v-link>
            <v-link tag="view" :to="detail.status!=2&&detail.status!=1?'/pages/auth/senior':''" class="d-flex align-center  p-md border-b link-active">
                <view class="flex-fill color-light fn-lg ">
                    {{$t('auth.a4')}}
                </view>
                <view class="status " v-if="detail.status==0">
                    <van-icon class="fn-middle" name="info-o" />
                    {{$t('auth.a2')}}
                </view>
                <view class="status color-yellows" v-else-if="detail.status==1">
                    <van-icon class="fn-middle" name="clock-o" />
                    {{$t('auth.a5')}}
                </view>
                <view class="status color-buy" v-else-if="detail.status==2">
                    <van-icon class="fn-middle" name="passed" />
                    {{$t('auth.a3')}}
                </view>
                <view class="status color-sell" v-else-if="detail.status==3">
                    <van-icon class="fn-middle" name="close" />
                    {{$t('auth.a6')}}
                </view>
                <van-icon class="m-l-xs" name="arrow" />
            </v-link>
        </view>
        <view v-if="detail.status==3" class="m-l-lg color-sell"><van-icon class="m-l-xs" name="info-o" />{{detail.remark}}</view>
    </view>
</template>
<script>
import { mapState,mapGetters} from "vuex";
import Profile from "@/api/profile";
export default {
    name:'auth',
    data(){
        return {
            detail:{}
        }
    },
    computed:{
        ...mapState({
            user:'user'
        }),
        ...mapGetters(['themeStyle'])
    },
    methods:{
        getAuthInfo(){
            Profile.getAuthInfo().then(res=>{
                this.detail = res.data
            })
        }
    },
    created(){
        this.getAuthInfo()
    }
}
</script>
<style lang="scss" scoped>
    
</style>