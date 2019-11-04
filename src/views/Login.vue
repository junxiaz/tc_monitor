<template>
  <div class="login">
    <div class="login-content">
      <h1 class="title">登录</h1>
      <el-divider></el-divider>
      <el-form :model="ruleForm" label-position="right" style="padding-right: 62px;" status-icon :rules="rules" ref="ruleForm" label-width="134px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userCode">
          <el-input size="larger" v-model.number="ruleForm.userCode" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input type="password" v-model="ruleForm.userPwd" prefix-icon="el-icon-lock" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')" to="/home">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//   import { mapState } from "vuex";
//   import md5 from 'js-md5';
  import { reqUserLogin } from "../api";
  export default {
    data() {
      var checkuserCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if(!/^[0-9a-zA-Z]{6,20}/.test(value)) {
            callback(new Error('请输入6~20位数字或字母'))
          } else {
            callback()
          }
        }, 1000);
      };
      var validateuserPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
      };
      return {
        ruleForm: {
          userPwd: '',
          userCode: '',
        },
        loading: false,
        redirect: undefined,
        otherQuery: {},
        rules: {
          userPwd: [
            { validator: validateuserPwd, trigger: 'blur' }
          ],
          userCode: [
            { validator: checkuserCode, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        this.$router.push({
          path: '/project'
        })
      },
    //   submitForm(formName) {
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         let {userPwd, userCode} = this.ruleForm;
    //         let userPass = md5(userPwd.toLocaleUpperCase());
    //         this.login(userPass, userCode);
    //       } else {
    //         return false;
    //       }
    //     });
    //   },
      async login(userPwd, userCode) {
        let result = await reqUserLogin({userCode, userPwd})
        if(result.code === '0000') {
          const token = result.token
          const shopCode = result.shopCode
          const userTypeCode = result.userTypeCode
          this.loading = true
          this.$store.dispatch('recordUser', {token, userCode, shopCode, userTypeCode})
            .then(() => {
              this.loading = false
              this.$router.replace('/project')
            }).catch(() => {
              this.loading = false
            })
        } else {
          this.$alert(result.msg, '消息', {
            confirmButtonText: '确定',
            callback: () => {
              return false 
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss">
.el-divider {
  background: #1EABFF;
  height: 2px;
}
.el-form-item__label {
  font-size: 20px;
  color: #2C2C2C;
}
.el-input__inner {
  height: 50px;
  line-height: 50px;  
  background: #FAFAFA;
  border: 1px solid #979797;
  border-radius: 7px;
  font-size: 20px;
  color: #939393;
  padding-left: 48px!important;
}
.el-input__icon {
  font-size: 23px;
  line-height: 50px;
  width: 48px;
}
.el-form-item {
    margin-bottom: 40px;
}
</style>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    background: url('../assets/imgs/bg_login.png') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    .login-content {
      width: 690px;
      height: 402px;
      padding: 47px;
      box-sizing: border-box;
      background: #FFFFFF;
      box-shadow: 0 2px 15px 0 rgba(114,121,156,0.50);
      border-radius: 2px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .title {
        font-size: 30px;
        color: #1EABFF;
        text-align: center;
        font-weight: 500;
        margin: 0;
        margin-bottom: 20px;
      }
      .btn {
        text-align: center;
        margin-left: -36px;
        .el-button {
          width: 140px;
        }
      }
    }
  }
</style>