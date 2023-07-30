<template>
  <div class="opt-box">
    <div class="markets-pair-list">
      <ul class="nav nav-pills" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            data-toggle="pill"
            href="#tab1"
            role="tab"
            aria-selected="false"
          >{{$t('option.buyOption')}}</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            data-toggle="pill"
            @click="resGetSceneResultList"
            href="#tab2"
            role="tab"
            aria-selected="false"
          >{{$t('option.deliveryRecord')}}</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade show active" id="tab1" role="tabpanel">
          <div class="time-box fn-12 text-nowrap mb-2">
            <div class="item d-flex justify-content-between py-2">
              <div class="col">{{$t('option.current')}}：{{current_scene.begin_time_text}}</div>
              <div class="col">{{current_scene.status_text}}</div>
              <div class="col">
                <time-count isAuto @end="resTimer" :startTime="current_scene.lottery_time" />
              </div>
            </div>
            <div class="item d-flex justify-content-between py-2">
              <div class="col">{{$t('option.next')}}：{{next_scene.begin_time_text}}</div>
              <div class="col">{{next_scene.status_text}}</div>
              <div class="col">
                <time-count isAuto @end="resTimer" :startTime="next_scene.lottery_time" />
              </div>
            </div>
          </div>
          <div class="form-box p-2">
            <div class="left-progrees"></div>
            <div class="form">
              <div class="item">
                <div
                  class="head d-flex justify-content-between align-items-center px-3 py-1 bg-light rounded-pill"
                >
                  <div>
                    <i class="el-icon-sort-up fn-22 increace"></i>
                    <el-dropdown>
                      <span class="status fn-22 increace">
                        {{$t('option.up')}}
                        <span class="fn-14">≥ {{activeUp.range}}%</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          class="d-flex"
                          v-for="item in up_odds"
                          :key="item.uuid"
                          @click.native="up=item.uuid"
                        >
                          <div class="col flex-fill pl-3 increace fn-12 text-nowrap">
                            <i class="el-icon-top fn-16"></i>
                            {{$t('option.up')}} ≥ {{item.range}}%
                          </div>
                          <div class="col flex-fill text-nowrap">{{$t('option.yield')}}：{{item.odds}}</div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div>
                    {{$t('option.yield')}}
                    <span>{{activeUp.odds}}</span>
                  </div>
                </div>
                <div class="mt-3" id="lookUp">
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                      >
                        <el-dropdown>
                          <span class="form-coin">{{upCoin.coin_name}} <i class="el-icon-caret-bottom"></i></span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              v-for="item in coinList"
                              :key="item.coin_id"
                              @click.native="checkCoin(upCoin=item)"
                            >{{item.coin_name}}</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </button>
                    </div>
                    <input
                      required
                      :min="upCoin.min_amount"
                      :max="upCoin.max_amount"
                      step="0"
                      v-model="upAmount"
                      :placeholder="$t('option.enterNum')"
                      type="number"
                      class="form-control"
                    />
                    <div class="input-group-append">
                      <button
                        type="button"
                        disabled
                        class="btn btn-outline-secondary"
                      >{{upCoin.coin_name}}</button>
                    </div>
                    <small class="w-100 form-text text-muted">
                      <span>{{$t('option.balance')}}：{{upCoin.balance||'--'}} {{upCoin.coin_name}}</span>
                      <span class="increace float-right">{{$t('option.expectedRevenue')}}：{{expected(upAmount,activeUp.odds)}}</span>
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  class="sub btn-success btn btn-sm"
                  @click="betScene(upAmount,upCoin.coin_id,activeUp.uuid,'#lookUp',upCoin)"
                >{{$t('option.seeMore')}}</button>
              </div>
              <div class="item mt-4">
                <div
                  class="head d-flex justify-content-between align-items-center px-3 py-1 bg-light rounded-pill"
                >
                  <div>
                    <i class="el-icon-sort-down fn-22 decreace"></i>
                    <el-dropdown>
                      <span class="status fn-22 decreace">
                        {{$t('option.down')}}
                        <span class="fn-14">≥ {{activeDown.range}}%</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          class="d-flex"
                          v-for="item in down_odds"
                          :key="item.uuid"
                          @click.native="down=item.uuid"
                        >
                          <div class="col flex-fill pl-3 decreace fn-12 text-nowrap">
                            <i class="el-icon-top fn-16"></i>
                            {{$t('option.down')}} ≥{{item.range}}%
                          </div>
                          <div class="col flex-fill text-nowrap">{{$t('option.yield')}}：{{item.odds}}</div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div>
                    {{$t('option.yield')}}
                    <span>{{activeDown.odds}}</span>
                  </div>
                </div>
                <div class="mt-3" id="lookDown">
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                      >
                        <el-dropdown>
                          <span class="form-coin">{{downCoin.coin_name}}  <i class="el-icon-caret-bottom"></i></span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              v-for="item in coinList"
                              :key="item.coin_id"
                              @click.native="checkCoin(downCoin=item)"
                            >{{item.coin_name}}</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </button>
                    </div>
                    <input
                      required
                      :min="downCoin.min_amount"
                      :max="downCoin.max_amount"
                      step="0"
                      v-model="downAmount"
                      :placeholder="$t('option.enterNum')"
                      type="number"
                      class="form-control"
                    />
                    <div class="input-group-append">
                      <button
                        type="button"
                        disabled
                        class="btn btn-outline-secondary"
                      >{{downCoin.coin_name}}</button>
                    </div>
                    <small class="w-100 form-text text-muted">
                      <span>{{$t('option.balance')}}：{{downCoin.balance||'--'}} {{downCoin.coin_name}}</span>
                      <span
                        class="increace float-right"
                      >{{$t('option.expectedRevenue')}}：{{expected(downAmount,activeDown.odds)}}</span>
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  class="sub btn-danger btn btn-sm"
                  @click="betScene(downAmount,downCoin.coin_id,activeDown.uuid,'#lookDown',downCoin)"
                >{{$t('option.beBearish')}}</button>
              </div>
              <div class="item mt-4">
                <div
                  class="head d-flex justify-content-between align-items-center px-3 py-1 bg-light rounded-pill"
                >
                  <div>
                    <span class="status fn-22">{{$t('option.flat')}}</span>
                    <span class="fn-14">≥|±{{activeDraw.range}}%|</span>
                  </div>
                  <div>
                    {{$t('option.yield')}}
                    <span>{{activeDraw.odds}}</span>
                  </div>
                </div>
                <div class="mt-3" id="lookDraw">
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                      >
                        <el-dropdown>
                          <span class="form-coin">
                            {{drawCoin.coin_name}}
                            <i class="el-icon-caret-bottom"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              v-for="item in coinList"
                              :key="item.coin_id"
                              @click.native="checkCoin(drawCoin=item)"
                            >{{item.coin_name}}</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </button>
                    </div>
                    <input
                      required
                      :min="drawCoin.min_amount"
                      :max="drawCoin.max_amount"
                      step="0"
                      :placeholder="$t('option.enterNum')"
                      v-model="drawAmount"
                      type="number"
                      class="form-control"
                    />
                    <div class="input-group-append">
                      <button
                        type="button"
                        disabled
                        class="btn btn-outline-secondary"
                      >{{drawCoin.coin_name}}</button>
                    </div>
                    <small class="w-100 form-text text-muted">
                      <span>{{$t('option.balance')}}：{{drawCoin.balance||'--'}} {{drawCoin.coin_name}}</span>
                      <span
                        class="increace float-right"
                      >{{$t('option.expectedRevenue')}}：{{expected(drawAmount,activeDraw.odds)}}</span>
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  class="sub btn-primary btn btn-sm"
                  @click="betScene(drawAmount,drawCoin.coin_id,activeDraw.uuid,'#lookDraw',drawCoin)"
                >{{$t('option.lookAtPing')}}</button>
              </div>
            </div>
          </div>
        </div>
        <!--交割记录 -->
        <div class="tab-pane fade show bill-list" id="tab2" role="tabpanel">
          <div class="d-flex justify-content-between fn-12 text-secondary p-2">
            <div>{{$t('option.time')}}</div>
            <div>{{$t('option.zf')}}</div>
          </div>
          <ul class="list p-2" v-infinite-scroll="resGetSceneResultList">
            <li
              class="d-flex justify-content-between fn-12"
              v-for="item in list"
              :key="item.scene_id"
            >
              <div>{{item.end_time_text}}</div>
              <div :class="item.delivery_range*1>=0?'increace':'decreace'">
                {{item.delivery_range*1>=0?'+':''}}
                {{item.delivery_range}}%
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Option from "@/api/option";
import utils from "../../utils";
export default {
  props: {
    activeCoin: {
      default: {},
      type: Object,
      required: false
    }
  },
  data() {
    return {
      current_scene: {},
      next_scene: {},
      // 看涨
      up_odds: [],
      up: "",
      upCoin: {},
      upAmount: "",
      // 看平
      draw_odds: [],
      draw: "",
      drawCoin: {},
      drawAmount: "",
      // 看跌
      down_odds: [],
      down: "",
      downCoin: {},
      downAmount: "",
      // 可交易币种
      coinList: [],
      // 交割记录
      page: 1,
      list: []
    };
  },
  watch: {
    // 监听选择的币种
    activeCoin(n,o) {
      if (!n.pair_id) return;
      if (n.pair_time_name == o.pair_time_name) return;
      this.sceneDetail();
      this.getOddsList();
      this.resGetSceneResultList();
    }
  },
  computed: {
    activeUp() {
      return this.up_odds.find(item => item.uuid == this.up) || {};
    },
    activeDown() {
      return this.down_odds.find(item => item.uuid == this.down) || {};
    },
    activeDraw() {
      return this.draw_odds.find(item => item.uuid == this.draw) || {};
    }
  },
  methods: {
    resTimer() {
      setTimeout(() => {
        this.sceneDetail();
        this.getOddsList();
      }, 1000);
    },
    // 获取数据
    sceneDetail() {
      let data = {
        pair_id: this.activeCoin.pair_id,
        time_id: this.activeCoin.time_id
      };
      Option.sceneDetail(data)
        .then(res => {
          this.current_scene = res.current_scene;
          this.next_scene = res.next_scene;
        })
        .catch(err => {});
    },
    // 获取赔率
    getOddsList() {
      let data = {
        pair_id: this.activeCoin.pair_id,
        time_id: this.activeCoin.time_id
      };
      Option.getOddsList(data).then(res => {
        this.up_odds = res.up_odds;
        this.down_odds = res.down_odds;
        this.draw_odds = res.draw_odds;
        // 默认选中第一个
        this.up = this.up_odds[0].uuid;
        this.down = this.down_odds[0].uuid;
        this.draw = this.draw_odds[0].uuid;
      });
    },
    // 获取期权交易币种
    getBetCoinList() {
      Option.getBetCoinList()
        .then(res => {
          this.coinList = res;
          this.upCoin = this.coinList[0] || {};
          this.drawCoin = this.coinList[0] || {};
          this.downCoin = this.coinList[0] || {};
          this.checkCoin(this.upCoin);
        })
        .catch(err => {});
    },
    // 选中交易币种 (需要登录)
    checkCoin(item) {
      let data = {
        coin_id: item.coin_id
      };
      if (!localStorage.getItem("token")) return;
      Option.getUserCoinBalance(data)
        .then(res => {
          this.$set(item, "balance", res.usable_balance);
        })
        .catch(err => {});
    },
    // 购买期权 [数量，币种id，赔率id,dom筛选器,交易币种obj]
    betScene(bet_amount, bet_coin_id, odds_uuid, domName, checkCoin) {
      let data = {
        bet_amount,
        bet_coin_id,
        odds_uuid,
        scene_id: this.next_scene.scene_id
      };
      if (utils.validate(domName)) {
        Option.betScene(data)
          .then(res => {
            if (res) {
              this.$message.success(this.$t('option.buySuccess'));
              this.upAmount = "";
              this.drawAmount = "";
              this.downAmount = "";
              this.$emit('buy-success')
              this.checkCoin(checkCoin);
            }
          })
          .catch(err => {});
      }
    },
    // 获取预计收益
    expected(num1, num2) {
      if (!num1 || !num2) return "0";
      return utils.multiple(num1, num2);
    },
    // 刷新纪录
    resGetSceneResultList() {
      this.page = 1;
      this.getSceneResultList();
    },
    getSceneResultList() {
      let data = {
        pair_id: this.activeCoin.pair_id,
        time_id: this.activeCoin.time_id,
        page: this.page
      };

      Option.getSceneResultList(data)
        .then(res => {
          if (res.current_page == 1) this.list = [];
          this.list = [...this.list, ...res.data];
        })
        .catch(err => {});
    }
  },
  created() {
    this.getBetCoinList();
  }
};
</script>