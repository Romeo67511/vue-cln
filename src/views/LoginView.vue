<template>
    <ContentBase>
      <div class="row justify-content-md-center">
        <div class="col-3">
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">用户名</label>
              <input v-model="username" type="username" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密码</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="error-message">{{ error_message }}</div>
            <button type="submit" class="btn btn-primary">登录</button>
          </form>
        </div>
      </div>


    </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase'
import { ref } from 'vue'
import { useStore } from 'vuex'
// @ is an alias to /src
export default {
  name: 'LoginView',
  components: {
    ContentBase
  },
  setup() {

    const store = useStore()

    let username = ref('')
    let password = ref('')
    let error_message = ref('')
   
    const login = () => {
      store.dispatch("login", {
        username: username.value,
        password: password.value,
        success() {
          console.log("success")
        },
        error() {
          console.log("fail")
        }
      })
    }

    return {
      username,
      password,
      error_message,
      login      
    }
  }
}
</script>

<style scoped>

</style>
