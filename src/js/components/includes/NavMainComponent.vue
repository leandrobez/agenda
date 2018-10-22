<template>
    <ul class="il-nav--list">
    
        <li class="il-nav--items" v-for="(item,index) in navList" :key="index">
            <i :class="item.icon"></i>
            {{item.label}}
        </li>
    
    </ul>
</template>

<script>
    export default {
    
        name: 'NavMain',

        data(){
            return {
                navList: [
                    {
                        icon: 'mdi mdi-24px mdi-castle il-color-texture--accent',
                        title: 'Home',
                        label: 'Home'
                    },
                    {
                        icon: 'mdi mdi-24px mdi-comment il-color-texture--accent',
                        title: 'Sobre',
                        label: 'Sobre'
                    },
                    {
                        icon: 'mdi mdi-24px mdi-human-handsup il-color-texture--accent',
                        title: 'Aulas',
                        label: 'Aulas'
                    },
                    {
                        icon: 'mdi mdi-24px mdi-video il-color-texture--accent',
                        title: 'Vídeos',
                        label: 'Vídeos'
                    },
                    {
                        icon: 'mdi mdi-24px mdi-calendar-text il-color-texture--accent',
                        title: 'Eventos',
                        label: 'Eventos'
                    },
                    {
                        icon: 'mdi mdi-24px mdi-contact-mail il-color-texture--accent',
                        title: 'Contato',
                        label: 'Contato'
                    },
                ]
            }
        }
    
    }
</script>
