<template>
  <div class="wallet-page">
    <secondary-nav></secondary-nav>
    <div class="container">
      <div class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4">
        <div class="h3">返佣记录</div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="panel-box container">
            <div class="row pt-3">
              <div class="div-group col-sm-3">
                <label>资产名</label>
                <input type="text" class="form-control" placeholder="请输入资产名" />
              </div>
              <div class="form-group col-sm-2">
                <label class="d-block">&nbsp;</label>
                <button type="submit" class="btn btn-outline-primary mb-2">搜索</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mt15">
          <div class="markets-pair-list mb-3">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="pill"
                  href="#tab1"
                  role="tab"
                  aria-selected="false"
                >返佣记录</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                <table class="table">
                  <thead>
                    <tr>
                      <th>日期</th>
                      <th>资产</th>
                      <th>数量</th>
                      <th class="text-right">返佣号</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in 10" :key="item">
                      <td>2020-10-10 20:20:20</td>
                      <td>
                        <img src="../../assets/img/icon/1.png" alt="eth" /> ETH
                      </td>
                      <td>123</td>
                      <td class="text-right">321</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">上一页</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">下一页</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>