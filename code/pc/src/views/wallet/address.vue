<template>
  <div class="wallet-page">
    <secondary-nav></secondary-nav>
    <div class="container">
      <div
        class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4"
      >
        <div class="h3">{{ $t("wallet.addressManagement1") }}</div>
        <div class>
          <button
            type="button"
            class="btn btn-success"
            data-toggle="modal"
            data-target="#editAddress"
            @click="add"
          >
            <span class="ion-ios-add-circle-outline"></span>
            {{ $t("wallet.addAddress") }}
          </button>
        </div>
      </div>
      <!-- <div class="panel-box">
            <div class="heading">筛选器</div>
            <div class="container">
                <div class="row py-3">
                    <div class="form-group col-sm-3">
                        <label>搜索资产</label>
                        <el-select value='1' placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
        </div> -->
      <div class="row">
        <div class="col-md-12 mt15">
          <div class="markets-pair-list mb-3">
            <!-- <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="pill" href="#tab1" role="tab" aria-selected="false">地址列表</a>
                        </li>
                    </ul> -->
            <div class="tab-content panel-box">
              <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                <ul>
                  <li class="heading">
                    <span class="pr-2 border-right d-inline-block">{{
                      $t("wallet.assets")
                    }}</span>
                    <span class="pr-2 border-right d-inline-block">{{
                      $t("wallet.addressNum")
                    }}</span>
                    <span class="pr-2 d-inline-block">{{
                      $t("wallet.fee1")
                    }}</span>
                  </li>

                  <el-collapse accordion>
                    <el-collapse-item
                      v-for="coin in userAdressList"
                      :key="coin.coin_id"
                    >
                      <li slot="title" class="p-2">
                        <span>
                          <img :src="coin.icon" with="20" />
                          {{ coin.coin_name }} ( {{ coin.full_name }} )
                        </span>
                        <span>
                          {{ coin.total_address }}
                        </span>
                        <span>
                          {{ coin.withdrawal_fee }}
                        </span>
                      </li>
                      <table class="table stripe">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>{{ $t("wallet.creationTime") }}</th>
                            <th>{{ $t("wallet.detailAddress") }}</th>
                            <th>{{ $t("wallet.remarks1") }}</th>
                            <th>{{ $t("wallet.operating") }}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(address, index) in coin.list"
                            :key="address.id"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>
                              {{ address.datetime | parseTime }}
                            </td>
                            <td>
                              <span :id="`withdrawal-address-${index}`">
                                {{ address.address }}
                              </span>
                              <!-- 使用clipboard-target指定复制的元素 -->
                              <span
                                :class="`my-pop-${index}`"
                                data-toggle="popover"
                                data-placement="bottom"
                                :data-content="$t('wallet.complete') + '!'"
                              >
                                <a
                                  href="javascript:void 0"
                                  :data-clipboard-target="`#withdrawal-address-${index}`"
                                  alt="Copy to clipboard"
                                  :data-index="index"
                                  class="btn btn-outline-light btn-sm withdrawal-control"
                                  >{{ $t("wallet.copy") }}</a
                                >
                              </span>
                            </td>
                            <td>{{ address.address_note }}</td>
                            <td class="text-right">
                              <!-- <div class="btn-group btn-group-sm text-nowrap" role="group" aria-label="Basic example"> -->
                              <button
                                type="button"
                                class="btn btn-sm btn-info"
                                data-toggle="modal"
                                data-target="#editAddress"
                                @click="edit(address)"
                              >
                                {{ $t("wallet.editAddress") }}
                              </button>
                              <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="del(address.id)"
                              >
                                {{ $t("wallet.deleteAddress") }}
                              </button>
                              <!-- </div> -->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </el-collapse-item>
                  </el-collapse>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="editAddress"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-panel">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ action == "add" ? $t("wallet.add") : $t("wallet.edit")
              }}{{ $t("wallet.address") }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-assets" class="col-form-label"
                  >{{ $t("wallet.assets") }}:</label
                >
                <div>
                  <!-- 编辑时禁止选择币种 -->
                  <el-select
                    :placeholder="$t('wallet.selectAssets')"
                    v-model="userAdress.coin_name"
                    :disabled="action == 'edit'"
                  >
                    <el-option
                      :label="coin.coin_name"
                      :value="coin.coin_name"
                      v-for="coin in coinsForWithdrawal"
                      :key="coin.coin_id"
                    >
                      <img :src="coin.image" width="20" />
                      {{ coin.coin_name }}({{ coin.full_name }})
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="form-group">
                <label for="recipient-adress" class="col-form-label"
                  >{{ $t("wallet.drawAddress") }}:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="recipient-adress"
                  v-model="userAdress.address"
                />
              </div>
              <div class="form-group">
                <label for="comments" class="col-form-label"
                  >{{ $t("wallet.addressRemarks") }}:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="comments"
                  v-model="userAdress.address_note"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary rounded-pill"
              data-dismiss="modal"
            >
              {{ $t("common.cancelBtn") }}
            </button>
            <button
              type="button"
              class="btn btn-primary rounded-pill"
              @click="handleUserAddress"
            >
              {{ $t("common.confirmBtn") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Wallet from "@/api/wallet";
import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      action: null,
      userAdressList: [], // 用户币种地址集合
      userAdress: {
        // 添加或编辑地址集合
        address: "",
        coin_name: "",
        address_note: "",
      },
      editAddressId: null,
      coinsForWithdrawal: [], // 所有提币地址
    };
  },

  methods: {
    getUserAdressList() {
      Wallet.getUserWithdrawAdress()
        .then((data) => {
          this.userAdressList = data;
        })
        .catch((err) => {});
    },

    getCoinsForWithdraw() {
      Wallet.withdrawalSelectAddress()
        .then((data) => {
          this.coinsForWithdrawal = data.list;
        })
        .catch((err) => {});
    },

    // 清除模态框数据
    resetModal() {
      this.userAdress = {
        address: "",
        coin_name: "",
        address_note: "",
      };
    },

    add() {
      // 设置动作
      this.action = "add";
      // 清空输入框
      this.resetModal();
      // 查询币种
      if (!this.coinsForWithdrawal.length) this.getCoinsForWithdraw();
    },

    edit(item) {
      this.action = "edit";
      // 写入记录值
      this.userAdress = item;
      this.editAddressId = item.id;
      if (!this.coinsForWithdrawal.length) this.getCoinsForWithdraw();
    },

    del(id) {
      this.$confirm(this.$t("wallet.remarksDelete") + "?",{
        confirmButtonText:this.$t('common.confirmBtn'),
        cancelButtonText:  this.$t('common.cancelBtn')
      })
        .then(() => {
          Wallet.withdrawalAddressDeleted({ id })
            .then((res) => {
              this.$message({
                type: "success",
                message: this.$t("wallet.optionSuccess") + "！",
              });
              // 更新页面数据
              this.getUserAdressList();
            })
            .catch((err) => {});
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: err.message,
          });
        });
    },

    handleUserAddress() {
      let pms;
      switch (this.action) {
        case "add":
          pms = Wallet.addWithdrawAddress(this.userAdress);
          break;
        case "edit":
          pms = Wallet.withdrawalAddressModify(
            Object.assign(
              {
                id: this.editAddressId,
              },
              this.userAdress
            )
          );
          break;
      }

      pms
        .then((res) => {
          if (res == true) {
            this.$message({
              type: "success",
              message: this.$t("wallet.optionSuccess") + "！",
            });
            // 更新页面数据
            this.getUserAdressList();
            // 清空订单状态
            this.resetModal();
            // 关闭模态框
            $("#editAddress").modal("hide");
          }
        })
        .catch((err) => {});
    },
  },

  created() {
    this.getUserAdressList();
  },

  mounted() {
    const clipboard = new ClipboardJS(".withdrawal-control");

    clipboard.on("success", function (e) {
      let index = e.trigger.dataset.index;

      $(`.my-pop-${index}`).popover("show");
      setTimeout(function () {
        $(`.my-pop-${index}`).popover("hide");
      }, 500);
      // 清除选取内容
      // e.clearSelection();
    });

    clipboard.on("error", function (e) {
      // console.error('Action:', e.action);
      // console.error('Trigger:', e.trigger);
    });
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .el-collapse {
    border-top-color: #4e4e5d;
    border-bottom-color: #4e4e5d;
  }
  .el-collapse-item__header {
    background: transparent;
    color: inherit;
    border-color:#4e4e5d;
  }
  .el-collapse-item__wrap{
      background: transparent;
      border-color:#4e4e5d;
  }
}

</style>
