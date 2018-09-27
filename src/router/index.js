import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import MainLayout from "../components/MainLayout.vue";
import HomeLayout from "../components/layouts/HomeLayout.vue"
import Auth from "../components/layouts/Auth.vue"
import ContactUs from "../components/layouts/ContactUs.vue"
import Tutor from "../components/layouts/Tutor.vue"
import Faq from "../components/layouts/Faq.vue"
import HowTeach from "../components/layouts/HowTeach.vue"

import EmailVerification from "../components/layouts/EmailVerification.vue"
import EmailConfirmation from "../components/layouts/EmailConfirmation.vue"

import ForgotPassword from "../components/layouts/ForgotPassword.vue"
import ResetPassword from "../components/layouts/ResetPassword.vue"

import MediStart from "../components/layouts/main/MediStart.vue"
import SetAvailableLayout from "../components/layouts/main/tutor/SetAvailableTime.vue"
import SetTrialTime from "../components/layouts/main/admin/SetTrialTime.vue"
import BookTrial from '../components/layouts/main/student/PrebookTrial.vue'

import Dashboard from '../components/layouts/main/Dashboard.vue'

import Payment from "../components/layouts/home-components/Payment.vue"
import SignUp from "../components/layouts/SignUp.vue"

export default new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/index", component: MainLayout,
      children: [
        { path: '', component: HomeLayout, name: 'home' },
        {
          path: "/contact", component: ContactUs, name: 'contact'
        },
        {
          path: "/tutor", component: Tutor, name: 'tutor'
        },
        {
          path: "/faq", component: Faq, name: 'faq'
        },
        {
          path: "/teach", component: HowTeach, name: 'teach'
        },
        {
          path: "/signup", component: SignUp, name: 'signup'
        }
      ]
    },
   {
      path: "/medi", component: MediStart, name:"medi",
      children: [ 
        { path:'setavailable' , component: SetAvailableLayout, name:'setavailable'},
        { path: 'settrial' , component: SetTrialTime, name: 'settrial'},
        { path: 'booktrial', component: BookTrial , name:'booktrial'},
        { path: 'dashboard', component: Dashboard , name:'dashboard'},
        { path:'payment',component: Payment, name:'payment'},
        { path: "/", redirect: "dashboard"}
      ]
    },
    {
      path: "/auth", component: Auth, name: 'auth'
    },

    {
      path: "/verify/email_verification", component: EmailVerification, name: 'emailVerification'
    },
    {
      path: "/verify/email_confirmation/:email_token", component: EmailConfirmation, name: 'emailConfirmation'
    },
    {
      path: "/verify/forgot_password", component: ForgotPassword, name:'forgotPassword'
    },
    {
      path: "/verify/reset_password/:reset_token", component: ResetPassword, name:'resetPassword'
    },
    { path: '/', redirect: '/index' }
  ]
})
