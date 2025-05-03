import $ from 'jquery'
import { jwtDecode } from 'jwt-decode'

const ModuleUser = {
  state: {
    id: "",
    username: "",
    photo: "",
    followerCount: 0,
    access: "",
    refresh: "",
    is_login: false,
  },
  getters: {
  },
  mutations: {
    updateUser(state, user) {
      state.id = user.id;
      state.username = user.username;
      state.photo = user.photo;
      state.followerCount = user.followerCount;
      state.access = user.access;
      state.refresh = user.refresh;
      state.is_login = user.is_login;
  },
  },
  actions: {
    login(context, data) {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/api/token/",
        type: "POST",
        data: {
          username: data.username,
          password: data.password
        },
        success(resp) {
          const {access, refresh} = resp
          const access_obj = jwtDecode(access)
          //console.log(access_obj)
          

          setInterval(() => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                type: "POST",
                data: {
                    refresh,
                },
                success(resp) {
                    context.commit('updateAccess', resp.access);
                }
            });
          }, 1000)
      

          $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
                user_id: access_obj.user_id,
            },
            headers: {
                'Authorization': "Bearer " + access,
            },
            success(resp) {
                context.commit("updateUser", {
                    ...resp,
                    access: access,
                    refresh: refresh,
                    is_login: true,
                });
                data.success();
            }
        })
        }
      })
    }
  },
  modules: {
  }
}

export default ModuleUser
