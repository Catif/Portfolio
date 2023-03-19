export default {
	navbar: {
		home: "home",
		portfolio: "portfolio",
		blog: "blog",
	},

	footer: {
		mail: {
			message: "You can contact me at",
		},
		linkedin: {
			message: "Or by",
		},
	},

	presentation: {
		Me: {
			name: "My name is",
			presentation:
				"After 4 years’ experience in web development, learnt at school and personal time. I’m able to create websites for your company. I stay connected about new technologies to use them in my new futures projects.",
			downloadCV: "Download my CV",
		},
		IDE: {
			titleConfetti: "DON'T CLICK !",
			listRows: [
				{ text: "# Welcome" },
				{ text: "This is my portfolio, and I hope you will appreciate my art." },
				{ text: "" },
				{ text: "## Introduction" },
				{
					text: 'Currently, I am a student at "Université de Lorraine". To graduate, I need to do an intership (in your company maybe ? 👀)',
				},
				{ text: "" },
				{ text: "## My skills" },
				{
					text: "I am a full stack developer, and I can do a lot of things, but I will not list them all, just the most important ones.",
				},
				{ text: "" },
				{ text: "- HTML / CSS(SASS) / JS" },
				{ text: "- VueJS" },
				{ text: "- PHP / SLIM" },
				{ text: "- MySQL / MariaDB" },
				{ text: "- Flutter / Dart" },
				{ text: "" },
			],
		},
	},

	pinnedProjects: {
		title: "Pinned projects",
		list: [
			{
				name: "Tutored Project - Scudo",
				description:
					"You can stream like Twitch or Youtube, but this project is more focused on the protection of your videos.<br> You can record your videos on the cloud and watch it later, it is a security to not lost your video if you are in a bad position.",
				technologies: ["Slim", "MySQL", "VueJS", "WebRTC", "Docker", '(All technologies of "Streaming with web camera" project below)'],
				picture: "https://i.imgur.com/3ZQRuxT.png",
				github: "https://github.com/Catif/LP-PTUT_Scudo",
			},
			{
				name: "Streaming with web camera",
				description:
					'This is a project that allows you to stream your webcam with replay video stored on server.<br> That is the small part of a <a href="https://github.com/Catif/LP-PTUT_Scudo" target="_blank">bigger project</a> that I am working on at school.',
				technologies: ["NodeJS", "RTCMulticonnection", "Socket.io", "WebRTC", "Docker"],
				picture: "https://i.imgur.com/jBLx12H.gif",
				github: "https://github.com/Catif/Record-Live-WebRTC",
			},
			{
				name: "Atelier 1 - Photomedia",
				description:
					"You know <a href=\"https://www.pinterest.fr/\">Pinterest</a> ? This is a little clone of it. You can publish your own pictures and watch other people's pictures.<br> You can also create galeries or join other people's galeries and being a contributor of it.",
				technologies: ["PHP", "JavaScript", "SASS", "MySQL"],
				picture: "https://i.imgur.com/htfTxvO.jpeg",
				github: "https://github.com/Catif/LP1-CIASIE_Atelier1",
			},
		],
	},

	blog: {
		title: "Blog",
	},
};
