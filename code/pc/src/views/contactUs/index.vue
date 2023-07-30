<template>
<div class="contact-us-page">

    <div class="text-center mt-5 pt-5">
        <h2 class="">{{$t('contact.contact')}}</h2>
        <div class="h6 mt-3">{{$t('contact.help')}}</div>
    </div>

    <div class="body">
        <div class="container form-content rounded-sm mt-5 shadow py-4">
            <div class="row">
                <div class="col-8 border-right">
                    <form class="cont-body">
                        <div class="form-group">
                            <label>{{$t('contact.fullName')}}</label>
                            <input type="text" required v-model="consults.realname" :placeholder="$t('contact.enterFullName')" class="form-control" />
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>{{$t('contact.email')}}</label>
                                <input type="email" required v-model="consults.email" :placeholder="$t('contact.enterEmail')" class="form-control" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputPassword4">{{$t('contact.consultingService')}}</label>
                                <el-select v-model="consults.category_id" :placeholder="$t('contact.pleseSelect')">
                                    <el-option v-for="(item,index) in consultings" :key="index" :label="item.name" :value="item.id">

                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>{{$t('contact.info')}}</label>
                            <textarea required :placeholder="$t('contact.enterInfo')" class="form-control" v-model="consults.contents"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-50 rounded-pill" @click.prevent="handle">{{$t('contact.submit')}}</button>
                    </form>
                </div>
                <div class="col-4">
                    <div class="py-2">
                        <div class="my-3">
                            {{$t('contact.contactInformation')}}:
                            <div class="">{{contacts.contact}}</div>
                        </div>
                        <div class="my-3">
                            <div class="label">{{$t('contact.routineConsultation')}}:</div>
                            <div class="">{{contacts.email}}</div>
                        </div>
                        <div class="my-3">
                            <div class="label">{{$t('contact.customerService')}}:</div>
                            <div class="">{{contacts.service}}</div>
                        </div>
                        <div class="my-3">
                            <div class="label">{{$t('contact.mediaCooperation')}}:</div>
                            <div class="">{{contacts.media}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ContactUs from "@/api/contactUs";

export default {
    data() {
        return {
            consultings: [],
            consults: {
                realname: '',
                email: '',
                contents: '',
                category_id: '',
            },
            contacts : {
                email: "",
                service : "",
            }
        }
    },

    methods: {
        handle() {
            if (utils.validate('.cont-body')) {
                ContactUs.contactUs(this.consults).then(response => {
                    this.$message({
                        type: "success",

                        message: "提交成功，感谢您的关注！"
                    });
                    // 清空表单
                    this.consults = {
                        realname: '',
                        email: '',
                        contents: '',
                        category_id: '',
                    };
                }).catch(err => {});
            }
        }
    },
    created() {

        ContactUs.getConsultings().then(data => {
            this.consultings = data;
        }).catch(err => {

        });

        ContactUs.contact().then(data => {
            this.contacts = data;
        }).catch(err => {

        });

    }
};
</script>

<style>
</style>
