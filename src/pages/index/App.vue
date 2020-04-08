<template>
    <div>
        <NavBar/>
        <h1>Beam Scooters Engineering Internship Exercise App</h1>
        <router-view/>
    </div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import NavBar from './components/NavBar.vue'; 

	@Component({
		components: {
			NavBar, 
		}
	})

	export default class App extends Vue {
	}
</script>
