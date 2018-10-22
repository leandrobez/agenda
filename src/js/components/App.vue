<template>
<div class="il-container">
    <il-header></il-header>
    <il-nav></il-nav>
    <main class="il-container--item">
        <router-link ></router-link>
    </main>
    <footer class="il-container--item">footer</footer>
</div>
</template>

<script>
import Header from './includes/HeaderComponent.vue';
import Nav from './includes/NavComponent.vue';
import BigImage from './includes/BigImageComponent.vue'
export default {
    name: "App",
    components: {
        ilHeader: Header,
        ilNav: Nav,
        ilBigImage: BigImage
    }
}
</script>
