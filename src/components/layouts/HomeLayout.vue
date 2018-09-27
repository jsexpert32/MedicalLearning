<template>
  <div class="home-container">
    <feature-banner></feature-banner>
    <div class="clearfix"></div>
    <why-us> </why-us>
    <div class="clearfix"> </div>
    <student-reviews> </student-reviews>
    <div class="clearfix"> </div>
    <our-process> </our-process>
    <div class="clearfix"> </div>
    <subscription-box> </subscription-box>
  </div>
</template>

<script>
  import FeatureBanner from './home-components/FeatureBanner.vue'
  import WhyUs from './home-components/WhyUs.vue'
  import StudentReviews from './home-components/StudentReviews.vue'
  import OurProcess from './home-components/OurProcess.vue'
  import SubscriptionBox from './home-components/SubscriptionBox.vue'


  export default {
    name: "home-layout",
    components: {
      FeatureBanner,
      WhyUs,
      StudentReviews,
      OurProcess,
      SubscriptionBox
    },
    beforeCreate() {

    },
    created() {

    }
  }
</script>
