import {
  createStore
} from "vuex";
import user from "./modules/users";
import tabs from './modules/tabs'
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  getters,
  modules: {
    user,
    tabs
  },
  plugins: [
    // 默认储存在localstorage
    createPersistedState({
      // 本地储存名
      key: "user",
      // 指定模块
      paths: ["user"],
    }),
  ],
});