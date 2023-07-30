<template>
  <div class="profile-page">
    <secondary-nav></secondary-nav>
    <div class="container">
      <div class="reset-password mx-auto shadow-sm p-4 rounded border">
        <div class="fn-22 font-weight-bold text-center mb-3">重置密码</div>
        <form>
          <div class="form-group">
            <label>旧密码</label>
            <input type="password" class="form-control" placeholder="请输入旧密码" />
          </div>
          <div class="form-group">
            <label>新密码</label>
            <input type="password" class="form-control" placeholder="请输入新密码" />
          </div>
          <div class="form-group">
            <label>确认新密码</label>
            <input type="password" class="form-control" placeholder="请确认确认新密码" />
          </div>
          <div class="form-group">
            <label>短信验证</label>
            <div class="input-group mb-3">
              <input type="number" class="form-control" placeholder="请输入验证码" />
              <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button">发送验证码</button>
              </div>
            </div>
          </div>
          <button type="button" class="btn w-100 btn-primary">确定</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
