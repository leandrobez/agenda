<template>
    <div class="il-nav--content__sociais">
    
        <ul class="il-sociais--list">
    
            <li v-for="(item,index) in icons" :key="index">
    
                <i :class="item.ico" @click="netOpen(item.open)"></i>
    
            </li>
    
        </ul>
    
    </div>
</template>

<script>

    import icons from '../../../commom/sociais.js';
    
    export default {
    
        name: 'SocialComponentHz',
    
        data() {
    
            return {
    
                icons: ""
    
            };
    
        },
    
        methods: {
    
            netOpen(net) {
    
                let w = 626,
    
                    h = 436;
    
                switch (net) {
    
                    case "fb":
    
                        window.open(
    
                            "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("https://www.facebook.com/BusqueFilme/?ref=bookmarks") +
    
                            "&amp;t=" + encodeURIComponent("Busque Filme ##BusqueFilme #snippet"),
    
                            "fb-follow",
    
                            "width=" + w + ",height=" + h
    
                        );
    
                        break;
    
                    case "in":
    
                        window.open(
    
                            "http://instagram.com/claumuraguti?ref=badge",
    
                            "instagram-share-dialog",
    
                            "width=" + w + ",height=" + h
    
                        );
    
                        break;
    
                    case "wap":
    
                        window.open(
    
                            "https://api.whatsapp.com/send?phone=5551999767179",
    
                            "whatsapp-share-dialog",
    
                            "width=" + w + ",height=" + h
    
                        );
    
                        break;
    
                    case "email":
    
                        this
    
                            .$router
    
                            .push({
    
                                name: 'Contact'
    
                            })
    
                        break;
    
                    case "tw":
    
                        window.open(
    
                            "https://www.twitter.com/internetlojas",
    
                            "twitter-share-dialog",
    
                            "width=" + w + ",height=" + h
    
                        );
    
                        break;
    
                    case "g+":
    
                        window.open(
    
                            "https://plus.google.com/u/0/114144280855980132006",
    
                            "google-share-dialog",
    
                            "width=" + w + ",height=" + h
    
                        );
    
                        break;
    
                    case "menu":
    
                        let setURL = "/login"; //this.setURL();    
    
                        let width = 450,
    
                            height = 500,
    
                            w = screen.width,
    
                            h = screen.height,
    
                            left = w / 2 - width / 2,
    
                            top = h / 2 - height / 2;
    
                        if (setURL) {
    
                            let url = encodeURI(setURL);
    
                            let wOpen = window.open(
    
                                url,
    
                                "Menu",
    
                                "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
    
                                width + ", height=" + height + ", top=" + top + ", left=" + left
    
                            );
    
                        }
    
                        break;
    
                }
    
            }
    
        }
    
    }
</script>
