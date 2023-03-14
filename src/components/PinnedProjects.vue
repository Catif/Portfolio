<script setup>
import PinnedProject from "@/components/assets/PinnedProject.vue";
import { reactive } from "vue";

const projects = reactive([
	{
		id: 1,
		name: "Projet Tutoré - Scudo",
		description:
			"You can stream like Twitch or Youtube, but this project is more focused on the protection of your videos.<br> You can record your videos on the cloud and watch it later, it is a security to not lost your video if you are in a bad position.",
		technologies: ["Slim", "MySQL", "VueJS", "WebRTC", "Docker", '(All technologies of "Streaming with web camera" project below)'],
		picture: "https://i.imgur.com/3ZQRuxT.png",
		github: "https://github.com/Catif/LP-PTUT_Scudo",
	},
	{
		id: 2,
		name: "Streaming with web camera",
		description:
			'This is a project that allows you to stream your webcam with replay video store on server.<br> That is the small part of a <a href="https://github.com/Catif/LP-PTUT_Scudo" target="_blank">bigger project</a> that I am working on at school.',
		technologies: ["NodeJS", "RTCMulticonnection", "Socket.io", "WebRTC", "Docker"],
		picture: "https://i.imgur.com/jBLx12H.gif",
		github: "https://github.com/Catif/Record-Live-WebRTC",
	},
	{
		id: 3,
		name: "Atelier 1 - Photomedia",
		description:
			"You know <a href=\"https://www.pinterest.fr/\">Pinterest</a> ? This is a little clone of it. You can publish your own pictures and watch other people's pictures.<br> You can also create galeries or join other people's galeries and being a contributor of it.",
		technologies: ["PHP", "JavaScript", "SASS", "MySQL"],
		picture: "https://i.imgur.com/htfTxvO.jpeg",
		github: "https://github.com/Catif/LP1-CIASIE_Atelier1",
	},
]);
</script>

<template>
	<section id="Projects" class="alternate-background">
		<h2>Pinned projects</h2>
		<div id="list-pinned-projects">
			<PinnedProject v-for="project in projects" :key="project.id" :project="project" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
#Projects {
	#list-pinned-projects {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 50px;
	}
}
</style>
