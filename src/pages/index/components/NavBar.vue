<template>
    <div class="nav-bar">
        <div class="basic">
            <router-link class="nav" to="/">Home</router-link>
            <router-link class="nav" to="/about">About</router-link>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    .nav-bar, .basic, .users {
        display: flex;
        justify-content: center;
        background: aquamarine;
    }

    .nav {
        margin: 10px 0;
        padding: 5px 10px;
        font-size: 20px;
        text-decoration: none;
        color: black;
        display: block;
        cursor: pointer;
        border: 1px solid transparent;
        background: transparent;
        box-sizing: border-box;
        &:hover {
            border-bottom: 1px solid;
        }
    }
</style>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})
    export default class NavBar extends Vue {

    }
</script>
