<template>
    <div>
        <h1>About</h1>
        <h2>Lorem ipsum</h2>
        <div>Lorem ipsum lorem ipsum</div>
        <label> Matrix size:
            <input v-model="size"/>
        </label>
        <label> Matrix value:
            <input v-model="value"/>
        </label>
        <table class="table">
            <tr v-for="n in Size">
                <td v-for="i in Size">{{value}}</td>
            </tr>
        </table>
    </div>
</template>

<style lang='scss' scoped>
    .table {
        margin: auto;
    }
</style>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})
    export default class About extends Vue {
        value: number = 1;
        size: string = '20';

        get Size(): number {
            return parseInt(this.size);
        }

    }
</script>
