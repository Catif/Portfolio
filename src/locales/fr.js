export default {
	navbar: {
		home: "accueil",
		portfolio: "portfolio",
		blog: "blog",
	},

	footer: {
		mail: {
			message: "Vous pouvez me contacter sur",
		},
		linkedin: {
			message: "Ou sur",
		},
	},

	presentation: {
		Me: {
			name: "Je m'appelle",
			presentation:
				"Après 4 ans d'expérience dans le développement web, appris à l'école et en temps personnel. Je suis capable de créer des sites web pour votre entreprise. Je reste connecté aux nouvelles technologies pour les utiliser dans mes nouveaux projets futurs.",
			downloadCV: "Télécharger mon CV",
		},
		IDE: {
			titleConfetti: "NE CLIQUEZ PAS !",
			listRows: [
				{ text: "# Bienvenue" },
				{ text: "Ceci est mon portfolio, et j'espère que vous apprécierez mon art." },
				{ text: "" },
				{ text: "## Introduction" },
				{
					text: "Actuellement, je suis un étudiant à l'Université de Lorraine. Pour être diplomé, je dois faire un stage en entreprise (dans votre entreprise peut-être ? 👀)",
				},
				{ text: "" },
				{ text: "## Mes compétences" },
				{
					text: "Je suis un développeur full stack, et je peux faire beaucoup de choses, mais je ne vais pas tout lister, juste les plus importantes.",
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
		title: "Projets épinglés",
		list: [
			{
				name: "Projet Tutoré - Scudo",
				description:
					"Vous pouvez stream comme Twitch ou Youtube, mais ce projet se concentre plus sur la protection de vos vidéos.<br> Vous pouvez enregistrer vos vidéos dans le cloud et les regarder plus tard, c'est une sécurité pour ne pas perdre votre video si vous être dans une mauvaise situation.",
				technologies: [
					"Slim",
					"MySQL",
					"VueJS",
					"WebRTC",
					"Docker",
					'(Toutes les technologies de "Streaming avec une caméra en ligne" ci-dessous)',
				],
				picture: "https://i.imgur.com/3ZQRuxT.png",
				github: "https://github.com/Catif/LP-PTUT_Scudo",
			},
			{
				name: "Streaming avec une caméra en ligne",
				description:
					'Ceci est un projet qui vous autorise à stream votre webcam avec un replay enregistré sur le serveur.<br> C\'est une petite partie d\'<a href="https://github.com/Catif/LP-PTUT_Scudo" target="_blank">un plus grand projet</a> dont je suis en train de travaillé à l\'école',
				technologies: ["NodeJS", "RTCMulticonnection", "Socket.io", "WebRTC", "Docker"],
				picture: "https://i.imgur.com/jBLx12H.gif",
				github: "https://github.com/Catif/Record-Live-WebRTC",
			},
			{
				name: "Atelier 1 - Photomedia",
				description:
					'Vous connaissez <a href="https://www.pinterest.fr/">Pinterest</a> ? C\'est un petit clone de celui-ci. Vous pouvez publier vos propre images et voir celle des autres utilisateurs.<br> Vous pouvez aussi créer des galeries ou en rejoindre et en devenir un contributeur.',
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
