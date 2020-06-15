<template>


  <div style="background-color: #3d3744">

    <div class="video-container">
      <video src="https://static1.gotokeep.com/homepage/full.mp4" autoplay loop muted id="video-bg"></video>

    </div>

    <div class="login-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">美术世界拼团-管理用户注册V0.1</h3>
        </div>

        <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="pass">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
          <el-input  placeholder="请输入最少7位密码" v-model="ruleForm.pass" autocomplete="off"></el-input>

        </el-form-item>

        <el-form-item prop="checkPass">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
          <el-input  placeholder="请重新输入密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>

        </el-form-item>


        <!--      code验证码-->

        <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
          <el-input
            v-model="ruleForm.code"
            placeholder="请输入邀请码 pinpin"
            auto-complete="on"
          />
        </el-form-item>

        <el-button  type="primary" style="width:100%;margin-bottom:30px;background-color: #24c789;border: 0" @click.native.prevent="handleLogin">注册</el-button>



      </el-form>
    </div>

  </div>




</template>

<script>

import {createAdmin} from '@/api/user'

import axios from 'axios'
  export default {
    name: 'Login',
    data() {
      const checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else {
          callback()
        }

      };
      const validatePass = (rule, value, callback) => {
        if (value === ''||value.length<=6) {
          callback(new Error('请输入密码或者检查密码位数最少7位'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === ''||value.length<=6) {
          callback(new Error('请再次输入密码或者检查密码位数最少7位'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入注册验证码'));
        } else if (value !== 'pinpin') {
          callback(new Error('请输入正确的验证码!'));
        } else {
          callback();
        }
      };

      return {
        ruleForm: {
          username: '',
          pass: '',
          checkPass: '',
          code:''
        },
        rules: {
          username: [
            {  trigger: 'blur', validator: checkName }
            ],
          pass: [
            { validator: validatePass, trigger: 'blur',}
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur', }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
        },
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {

      handleLogin() {

        this.$refs.ruleForm.validate( async valid => {
          if (valid) {
            let params={
              name:this.ruleForm.username,
              passWord:this.ruleForm.pass
            }
             //20001 已存在
             const res = await createAdmin(params).catch(error=>error)
            console.log(res,"res-------res-----");
            //用户名存在
            if (res.code === 20001){
              return this.$message.error(res.msg);
            } if (res.code !== 20000){
              return this.$message.error(res.msg);
            }

            this.$router.push({ path: this.redirect || '/login' })
            // this.$store.dispatch('user/login', this.loginForm).then(() => {
            //   this.$router.push({ path: this.redirect || '/' })
            // }).catch(() => {
            // })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;


  .video-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
  }
  #video-bg {
    width: 100%;
    display: inline-block;
    vertical-align: baseline;
    object-fit: contain;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
