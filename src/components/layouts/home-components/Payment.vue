<template>
  <div>
    <h1> Pay </h1>
    <form action="/" method="POST">
      <stripe-checkout
              :stripe-key="key"
              product="product"
              button="pay"
              :options="option"
              on-success="broadcast">
      </stripe-checkout>
    </form>
  </div>
</template>

<script>
  import {StripeCheckout, Bus} from 'vue-stripe'
  import {Log} from '../../../utility/otherUtilities'
  export default {
    name: "payment",
    components: {
      StripeCheckout
    },
    beforeCreate() {

    },
    created() {


    },
    mounted() {
      Bus.$on('vue-stripe.success', payload => {
        this.onSuccess(payload);
      });

      Bus.$on('vue-stripe.not-found', (payload) => {

      });
    },
    data() {
      return {
        option: {
          name: 'Medlearnity',
          description: 'description here'
        },
        product: {
          name: 'Test Product',
          description: 'just testing',
          amount: 100000 // 100$ in cents
        },
        key: process.env.STRIPE_KEY
      }
    },
    updated () {

    },
    methods: {
      onSuccess(value) {
        Log.put('Stripe Token', value)
      }
    }

  }
</script>
