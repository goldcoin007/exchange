<template>
<div class="application-page">
    <div class="container">
        <div>
            <div class="thead">{{$t('application.form')}}</div>

            <div class="form-group">
                <span>{{$t('application.sendUser')}}（{{$t('application.sendUserEn')}}）*</span>
                <input v-model="form.send_user_en" type="text" required class="form-control" aria-describedby="emailHelp" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1"></label>
                <span>{{$t('application.sendUser')}}（{{$t('application.sendUserCn')}}）*</span>
                <input type="text" required v-model="form.send_user_cn" class="form-control" id="exampleInputPassword1" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword2"></label>
                <span>{{$t('application.contactPosition')}} *</span>
                <input type="text" required v-model="form.contact_position" class="form-control" id="exampleInputPassword2" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.phone')}} *</span>
                <input type="text" v-model="form.phone" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword4"></label>
                <span>TOKEN{{$t('application.tokenPrice')}} *</span>
                <input type="text" required v-model="form.token_price" class="form-control" id="exampleInputPassword4" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.email')}} *</span>
                <input type="text" v-model="form.email" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group">
                <label></label>
                <span>{{$t('application.address')}} *</span>
                <input type="text" v-model="form.address" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.mechanism')}}/{{$t('application.personal')}} *</span>
                <input type="text" v-model="form.mechanism" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.currencyCode')}}（{{$t('application.symbol')}}） *</span>
                <input type="text" v-model="form.coin_code" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group row">
                <div class="col-sm-3 col-form-label">
                    <span class="font">{{$t('application.currencyIdentification')}} (22px *22px)</span>
                    <div class="font1">{{$t('application.format',{name:'JPG,PNG',num:'500M'})}}</div>
                </div>
                <div class="col-sm-9">
                    <upload-img :allowSize="500" v-model="form.coin_icon" required placeholder="$t('application.currencyIdentification')" type="file" />
                </div>
            </div>
            <div class="form-group">
                <label></label>
                <span class="date">{{$t('application.fundraisingDate')}}*</span>
                <input type="text" v-model="form.end_time" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group">
                <label></label>
                <span>{{$t('application.officialWebsite')}}*</span>
                <input type="text" v-model="form.official_website" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group">
                <label></label>
                <span>{{$t('application.whitePaperLinks')}}（{{$t('application.noLink')}}）*</span>
                <input type="text" v-model="form.white_paper_link" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group">
                <label></label>
                <span>{{$t('application.total_issue')}} *</span>
                <input type="text" v-model="form.send_total" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.currencyCirculation')}} *</span>
                <input type="text" v-model="form.circulation" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group">
                <label></label>
                <span>{{$t('application.currencyAllocationRatio')}} *</span>
                <input type="text" v-model="form.ratio" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.numberOfCurrencyHolders')}} *</span>
                <input type="text" v-model="form.holders" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group">
                <label></label>
                <span>{{$t('application.tradingPlatform')}} *</span>
                <input type="text" v-model="form.online_platform" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.privatePlacement')}}/{{$t('application.publicOfferingPrice')}}（{{$t('application.company')}}）*</span>
                <input type="text" v-model="form.price" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group">
                <label></label>
                <span>{{$t('application.coinType')}}（ETH,EOS,Tron,Qtum,Neo etc) *</span>
                <input type="text" v-model="form.type" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group">
                <label></label>
                <span>
                    <div class="form-group">
                        <label></label>
                        <span>{{$t('application.currencyIssueDate')}} *</span>
                        <input type="text" v-model="form.send_time" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
                    </div>
                </span>
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.blockBrowser')}} *</span>
                <input type="text" v-model="form.browser" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.officialAddress')}} *</span>
                <input type="text" v-model="form.official_wallet_address" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.officialAddress')}} *</span>
                <input type="text" v-model="form.contract_address" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>Twitter{{$t('application.link')}}*</span>
                <input type="text" v-model="form.twitter" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>Telegram{{$t('application.link')}}*</span>
                <input type="text" v-model="form.telegram" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>Facebook{{$t('application.link')}}*</span>
                <input type="text" v-model="form.facebook" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.budget')}}（BTC{{$t('application.unit')}}）*</span>
                <input type="text" v-model="form.budget" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.ofTokens')}}*</span>
                <input type="text" v-model="form.number_tokens" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.chineseCurrency')}} *</span>
                <input type="text" v-model="form.cn_introduction" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.enCurrency')}} *</span>
                <input type="text" v-model="form.en_introduction" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>
            <div class="form-group">
                <label></label>
                <span>{{$t('application.remarks')}} *</span>
                <input type="text" v-model="form.remarks" required class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="form-group row">
                <div for="staticEmail" class="col-sm-3 col-form-label">
                    <div>{{$t('application.uploadWhitePaper')}}</div>
                    <div class="font1">{{$t('application.format',{name:'JPG,PNG',num:'500M'})}}</div>
                </div>
                <div class="col-sm-9">
                    <upload-img :allowSize="500" v-model="form.upload_white_paper" required :placeholder="$t('application.pleaseUpload')" type="file" />
                </div>
            </div>

            <div class="form-group">
                <label></label>
                <span class="font3">{{$t('application.recommendationCode')}}（{{$t('application.ifSo')}}）</span>
                <input type="text" v-model="form.referrer" class="form-control" :placeholder="$t('application.pleaseEnter')" />
            </div>

            <div class="font2">{{$t('application.affirmsThat')}}</div>
            <div class="form-group form-check">
                <div>
                    <input type="checkbox" v-model="check1" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">{{$t('application.iKnow')}}</label>
                </div>
                <input type="checkbox" v-model="form.check2" class="form-check-input" id="exampleCheck2" />
                <label class="form-check-label" for="exampleCheck2">{{$t('application.reSubmit')}}</label>
            </div>
            <button :disabled="!check1" type="button" class="btn btn-primary btn-lg btn-block" @click="ifSubmit">{{$t('common.submit')}}</button>
        </div>
    </div>
</div>
</template>

<script>
import Subscride from "@/api/subscride";
export default {
    data() {
        return {
            form: {
                send_user_en: "",
                send_user_cn: "",
                contact_position: "",
                phone: "",
                token_price: "",
                email: "",
                address: "",
                mechanism: "",
                coin_code: "",
                coin_icon: "",
                end_time: "",
                official_website: "",
                white_paper_link: "",
                send_total: "",
                circulation: "",
                ratio: "",
                holders: "",
                online_platform: "",
                price: "",
                type: "",
                send_time: "",
                browser: "",
                official_wallet_address: "",
                contract_address: "",
                twitter: "",
                telegram: "",
                facebook: "",
                budget: "",
                number_tokens: "",
                cn_introduction: "",
                en_introduction: "",
                remarks: "",
                upload_white_paper: "",
                referrer: "",
                check2: false
            },
            check1: false
        };
    },
    methods: {
        ifSubmit() {
            if (!utils.validate(".application-page")) return;
            if (!this.check1) {
                this.$message.warning(this.$t("application.pleaseConfirm"));
                return;
            }
            let data = this.form;
            Subscride.subscribe(data)
                .then(res => {
                    this.form = this.$options.data();
                    this.$message.success(this.$t("application.upLoadSuccess"));
                })
                .catch(err => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.application-page {
    background-color: #f8f9fa;
    padding: 20px;
    margin-bottom: -48px;

    .container {
        padding: 14px;
        background: #fff;
        border-radius: 14px;
    }
}

.thead {
    font-size: 30px;
    font-weight: strong;
    display: flex;
    justify-content: center;
}

.box1 {
    width: 100px;
    height: 100px;
    background: lightgray;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    margin-left: 220px;
}

.font1 {
    font-size: 10px;
    margin-top: 10px;
}

.font2 {
    margin-bottom: 20px;
}

.box1 {
    width: 100px;
    height: 100px;
    background: lightgray;
}

.btn .btn-outline-primary {
    width: 100px;
    height: 100px;
}

.date {
    margin-top: 30px;
}
</style>
