const getters = {
  sidebar: state => state.app.sidebar,
  enable: state => state.user.enable,
  memberId: state => state.user.memberId,
  accessToken: state => state.user.accessToken,
  email: state => state.user.email,
  name: state => state.user.name,
  showName: state => state.user.showName,
  permissions: state => state.user.permissions,
  menus: state => state.user.menus,
  language: state => state.app.language
  // ,
  // addRouters: state => state.permission.addRouters
}
export default getters
