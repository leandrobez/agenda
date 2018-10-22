import Video from "video.js";

const Player = Video.getPlayer();
let playerSetup = {
	"controls": true,
	"autoplay": false,
	"preload": "auto"
}
export default {
	Player,
	playerSetup
}