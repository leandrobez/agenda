import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**componente do client**/
import Home from '../components/partials/homeComponent.vue';
import Evaliation from '../components/partials/evaliationComponent.vue';
import Cadastro from '../components/partials/cadastroComponent.vue';
import Login from '../components/partials/loginComponent.vue';
//import Apod from '../components/includes/ApodComponent.vue';
//import Epic from '../components/includes/EpicComponent.vue';
/* Rotas a serem usadas */
const routes = [
  {
    path: '/home',
    name: 'Início',
    component: Home
  },
  {
    path: '/evaliation',
    name: 'Evaliation',
    component: Evaliation
  },
  {
    path: '/cadastrar',
    name: 'Cadastrar',
    component: Cadastro
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  /*{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/logout',
		name: 'Logout',
		component: Logout
	},
	{
		path: '/contact',
		name: 'Contact',
		component: Contact
	},
	{
		path: '/plan/subscription',
		name: 'Subscription',
		component: Subscription
	}*/
];

const router = new VueRouter({
  routes
});

export default router;
