<template>
	<div class="il-video--wrapper" id="il-video" v-if="checkPlayer">
	
		<!--<video id="il-trailer" :src="playerSetup.sources[0].src" :width="playerSetup.size" :height="playerSetup.height"></video>-->
	
		<iframe :width="playerSetup.size" :height="playerSetup.height" :src="playerSetup.sources[0].src" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
	
	</div>
</template>

<script>
	import Video from "video.js";
	
	//require("videojs-youtube");
	
	var doc = window.document;
	
	export default {
	
		name: "VideoComponent",
	
		mounted() {

			this.setVideo();
	
		},
	
		computed: {
	
			checkPlayer() {
	
				if (this.playerSetup) {
	
					return true
				}
	
				return false

			}
	
		},
	
		data() {
	
			return {
	
				/*videoSrc: 'videos/video-flores-japao.mp4',*/
	
				videoW: '720',
	
				videoPoster: 'https://i0.wp.com/www.maisquepilates.com.br/site/wp-content/uploads/2018/07/o-mercado-de-pilates-no-mundo-e-no-brasil.jpg?resize=696%2C435',
	
				youtubeKey: 'FzZBl7-9ro8',
	
				playerSetup: null,
	
			}

		},
	
		methods: {

			setVideo() {

				//require("videojs-youtube");

				var urlYoutube = 'https://www.youtube.com/embed/' + this.youtubeKey,
	
					playerSetup = {
	
						size: this.videoW,
	
						height: this.videoW * 0.5625,
	
						controls: "controls",

						allowfullscreen: "allowfullscreen",
	
						poster: this.videoPoster,

						autoplay: false,

						preload: "auto",
	
						techOrder: ["youtube"],
	
						sources: [{

							type: "video/youtube",

							src: urlYoutube
	
						}]
	
					};
				
				this.playerSetup = playerSetup;
	
				this.loadVideo();
	
			},
	
			loadVideo() {
	
	
	
				//alert('vou rodar');
	
	
	
				//var player = doc.querySelector("#il-trailer")
	
	
	
				//console.log(player)
	
	
	
				/*player.classList.add("il-player-video","video-js","vjs-defualt-skin");
	
	
	
				//player.id = "il-player";
	
	
	
				player.controls = playerSetup.controls;
	
	
	
				player.allowfullscreen = playerSetup.allowfullscreen;
	
	
	
				player.autoplay = playerSetup.autoplay;
	
	
	
				player.preload = playerSetup.preload;
	
	
	
				player.poster = playerSetup.poster;*/
	
	
	
	
	
	
	
				//document.getElementById("il-video").append(player);
	
	
	
				/*Video("#vidTrailer",playerSetup, function onPlayerReady(){
	
					
	
					Video.log("Tudo ok");
	
	
	
					
	
				});*/
	
			},
	
		}
	
	}
</script>