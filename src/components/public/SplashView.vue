<template>
    <header class="main-header">
        <navbar placement="static" type="default main-navbar">
            <!-- Brand as slot -->
            <a slot="brand" href="/" title="Home" class="navbar-brand">MedLearnity</a>
            <div slot="right">
                <headerbar></headerbar>
            </div>
        </navbar>
    </header>
</template>

<script>
    import HeaderBar from '../header-bar/HeaderBar.vue'
    import {navbar, dropdown} from 'vue-strap'

    export default {
        name: "splash-view",
        components: {
            headerbar: HeaderBar,
            navbar,
            dropdown
        },
        beforeCreate() {

        },
        created() {

        }
    }
</script>

<style class="scoped"></style>