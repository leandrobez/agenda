<template>
<!-- /* ====== HEADER ====== */-->
<!--HEADER-->
<header class="il-container--item il-header il-color-background--primary">
    <div class="il-container--wrapper">
        <h1 class="text-center il-color-texture--border il-title1--section">{{title}}</h1>
        <h4>{{subTitle}}</h4>
    </div>
</header>
</template>

<script>
export default {
    name: "HeaderComponent",
    components: {},
    data() {
        return {
            title: 'Pilates Boutique - Harmonia em Movimento',
						subTitle: 'Agenda do professor'
        }
    }
}
</script>
