<template>
  <div class="content-holder">
    <div class="container">
      <h1 class="text-center">Faq</h1>
      <hr/>
      <accordion :one-at-atime="true" type="info">
        <panel is-open type="primary">
          <strong slot="header">Question </strong>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, asperiores cum dicta eligendi facilis fugit
            neque optio reiciendis ut. Aspernatur enim est fugit harum minima, necessitatibus omnis repellendus unde
            ut. </p>
        </panel>
        <panel type="primary">
          <strong slot="header"> Question 2 </strong>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, asperiores cum dicta eligendi facilis fugit
            neque optio reiciendis ut. Aspernatur enim est fugit harum minima, necessitatibus omnis repellendus unde
            ut. </p>
        </panel>
        <panel type="primary">
          <strong slot="header"> Question 3 </strong>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, asperiores cum dicta eligendi facilis fugit
            neque optio reiciendis ut. Aspernatur enim est fugit harum minima, necessitatibus omnis repellendus unde
            ut. </p>
        </panel>
        <panel type="primary">
          <strong slot="header"> Question 4 </strong>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, asperiores cum dicta eligendi facilis fugit
            neque optio reiciendis ut. Aspernatur enim est fugit harum minima, necessitatibus omnis repellendus unde
            ut. </p>
        </panel>
      </accordion>
    </div>
  </div>
</template>

<script>
  import {accordion, panel} from 'vue-strap'
  export default {
    name: "faq",
    components: {
      accordion,
      panel
    },
    beforeCreate() {

    },
    created() {

    }
  }
</script>
