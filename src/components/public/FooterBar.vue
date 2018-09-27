<template>
  <footer class="main-footer">
    <div class="footer-inner">
      <div class="container">
        <div class="row">
          <div class="col-md-5 col-xs-12">
            <div class="info">
              <h1>MedLearnity</h1>
              <p>MediLern is the nation's leading medical education company, specializing in medical school admissions
                consulting and USMLE tutoring.</p>
            </div>
          </div>
          <div class="col-md-3 col-xs-12">
            <h3>Useful Links</h3>
            <ul class="list-unstyled">
              <router-link tag="li" exact-active-class="active" :to="{name: 'home'}">
                <a href="javascript:;"> Home </a>
              </router-link>
              <router-link exact-active-class="active" tag="li" :to="{name: 'tutor'}">
                <a href="javascript:;"> Tutors </a>
              </router-link>
              <router-link tag="li" exact-active-class="active" :to="{name: 'teach'}">
                <a href="javascript:;">How we teach</a>
              </router-link>
              <router-link :to="{name: 'faq'}" exact-active-class="active" tag="li">
                <a href="javascript:;">Faq </a>
              </router-link>
              <router-link :to="{name: 'signup'}" exact-active-class="active" tag="li">
                <a href="javascript:;">Sign up</a>
              </router-link>
              <router-link :to="{name: 'contact'}" exact-active-class="active" tag="li">
                <a href="javascript:;">Contact</a>
              </router-link>
            </ul>
          </div>
          <div class="col-xs-12 col-md-4">
            <h3>Contact Us</h3>
            <address>
              <ul class="list-unstyled">
                <li> Call us at <strong><a href="tel:508-928-7737"> 508-928-7737 </a> </strong></li>
                <li> Email us at <strong> <a href="mailto:info@medlearnity.com"> info@medlearnity.com </a>
                </strong></li>
              </ul>
            </address>
            <ul class="social-networks">
              <li><a href="javascript:;"> <i class="fa fa-facebook"> </i> </a> </li>
              <li><a href="javascript:;"> <i class="fa fa-google-plus"> </i> </a> </li>
              <li><a href="javascript:;"> <i class="fa fa-twitter"> </i> </a> </li>
              <li><a href="javascript:;"> <i class="fa fa-linkedin"> </i> </a> </li>
            </ul>
          </div>
        </div>
        <div class="clearfix"> </div>
        <div class="footer-bottom">
          <p>Copyright © 2017
            <router-link :to="{path: '/index'}"> MedLearnity</router-link>
            . | All right reserved
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>


  export default {
    name: "footer-bar",
    beforeCreate() {

    },
    created() {

    }
  }
</script>

<style class="scoped"></style>