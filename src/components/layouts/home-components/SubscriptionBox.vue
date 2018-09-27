<template>
  <div class="subscription-box text-center">
    <img class="bg-pattern" src="../../../asset/images/img-illustration.svg" alt="img illustration">
    <img class="bg-pattern dir-right" src="../../../asset/images/img-traingle.svg" alt="img traingle">
    <div class="container">
      <h1 class="main-title text-center">Push your score to Infinity</h1>
      <p class="sub-title">Please enter your email address to get started</p>
      <form class="subscription-form" @submit.prevent="emailRegister">
        <div class="form-group" :class="{'has-error': errors.has('email')}">
          <div class="input-group">
            <input type="email"
                   name="email"
                   class="form-control input-lg"
                   id="exampleInputAmount"
                   v-model="email"
                   v-validate="'required|email'"
                   placeholder="Your email address">
            <div class="input-group-btn">
              <button class="btn  btn-lg btn-submit" type="submit" :disabled="errors.has('email')"> Start</button>
            </div>
          </div>
          <p v-show="errors.has('email')" class="text-left text-danger">{{ errors.first('email') }}</p>
        </div>
      </form>
    </div>

  </div>
</template>

<script>


  export default {
    name: "subscription-box",
    data() {
      return {
        email: ''
      }
    },
    beforeCreate() {

    },
    created() {

    },
    methods: {
      emailRegister () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$router.push({name: 'signup', params: {email: this.email}})
          }
        }).catch(() => {
        });


      }
    }
  }
</script>
