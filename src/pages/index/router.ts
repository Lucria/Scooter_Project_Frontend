import Vue from 'vue'
import Router, {Route, RouteConfig} from 'vue-router'
import Maps from "./components/Maps.vue";
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";


Vue.use(Router);

const routes: RouteConfig[] = [
	{path: '/', name: 'home', component: Maps, meta: {public: true, private: true}},
	{path: '/apis', name: 'apis', component: About, meta: {public: true, private: true}},
	{path: '*', name: '404', component: NotFound, meta: {public: true, private: true}},
	
];
const router: Router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

//Middle Ware
router.beforeEach((to: Route, from: Route, next) => {
			return next();
});

export {router};
