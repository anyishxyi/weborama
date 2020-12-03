<template>
  <GeneralModal
    :modal-visible="visibility"
    width="900px"
    @eventModalClose="beforeClose"
  >
    <div class="login-page">
      <div class="login-container">
        <div class="wrapper">
          <el-form v-if="!success" ref="loginForm" :model="loginForm" autocomplete="on" label-position="left">
            <div class="title-container">
              <p class="title">
                Vous avez déjà un compte ?
              </p>
              <p class="title2">
                CONNECTEZ-VOUS
              </p>
            </div>

            <div class="identity-container">
              <p class="identity">vous êtes</p>
              <el-switch
                class="mb-37"
                v-model="loginForm.type"
                active-text="Une association"
                inactive-text="Un particulier">
              </el-switch>
            </div>

            <el-form-item prop="email">
              <el-input
                ref="email"
                v-model="loginForm.email"
                placeholder="email"
                name="email"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                ref="password"
                :key="passwordType"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="password"
                name="password"
                tabindex="2"
                autocomplete="on"
              />
            </el-form-item>
            <el-button :loading="loading" type="primary" class="btn" round @click.native.prevent="onSubmit">
              SE CONNECTER
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </GeneralModal>
</template>

<script>
import GeneralModal from '@/components/GeneralModal'

export default {
  name: "UserData",
  components: { GeneralModal },
  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        type: false
      },
      width: '33%',
      success: false,
      passwordType: 'password',
      loading: false,
    };
  },
  methods: {
    beforeClose(newVal) {
      console.log('beforeclose')
      console.log(newVal)
      this.$emit('eventToggleLoginVisibility', newVal)
    },
  }
}
</script>

<style lang="scss">
  .login-page {
    display: flex;
    .register-container, .login-container {
      display: flex;
      // align-items: center;
      justify-content: center;
      height: 500px;
      .wrapper {
        padding: 10px 25px;
        text-align: center;
        margin: 0 auto;
      }
    }
    .register-container {
      width: 450px;
      background-color: #1f2d3d;
      position: relative;
      .wrapper {
        width: 450px;
        min-width: 250px;
        color: #fff;
        margin: 0 20px;
        .title {
          text-transform: uppercase;
          font-family: "Montserrat-SemiBold",Verdana,Arial,sans-serif;
          font-size: 18px;
          padding-bottom: 80px;
          padding-top: 20px;
        }
        .title2 {
          font-family: "Montserrat-SemiBold",Verdana,Arial,sans-serif;
          font-size: 14px;
          padding-bottom: 90px;
        }
      }
    }
    .login-container {
      position: relative;
      width: 450px;
      .wrapper {
        width: 450px;
        min-width: 400px;
        text-align: center;
        .title-container {
          margin-top: 30px;
          position: relative;
          .title {
            text-transform: uppercase;
            font-family: "Montserrat-SemiBold",Verdana,Arial,sans-serif;
            font-size: 18px;
            padding-bottom: 10px;
          }
          .title2 {
            text-transform: uppercase;
            font-family: "Montserrat-SemiBold",Verdana,Arial,sans-serif;
            font-size: 16px;
            padding-bottom: 10px;
          }
        }
        .identity-container {
          margin-bottom: 40px;
          .identity {
            font-size: 20px;
            margin-bottom: 20px;
          }
        }
        .el-button.cta {
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
