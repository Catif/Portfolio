<script setup>
import { ref, inject } from "vue";

const disabledActions = ref(false);
const confetti = inject("confetti");

function runConffeti() {
	if (disabledActions.value) return;
	disabledActions.value = true;

	const limitedInterval = setInterval(() => {
		confetti.addConfetti({
			confettiColors: ["#3d7eff", "#62aaa5", "#455555"],
			confettiRadius: 5,
			confettiNumber: 700,
		});
	}, 100);

	setTimeout(() => {
		disabledActions.value = false;
		clearTimeout(limitedInterval);
	}, 1000);
}
</script>

<template>
	<section id="Presentation">
		<div id="Me">
			<div>
				<h2>{{ $t("presentation.Me.name") }}</h2>
				<h3>Bradley Barbier</h3>
				<p>{{ $t("presentation.Me.presentation") }}</p>
				<a href="" id="download-CV">{{ $t("presentation.Me.downloadCV") }}</a>
			</div>
		</div>
		<div id="IDE">
			<header>
				<p class="title">README.md</p>
				<div id="list-action">
					<div id="close" :title="$t('presentation.IDE.titleConfetti')" @click="runConffeti"></div>
					<div id="reduct" :title="$t('presentation.IDE.titleConfetti')" @click="runConffeti"></div>
					<div id="full" :title="$t('presentation.IDE.titleConfetti')" @click="runConffeti"></div>
				</div>
			</header>
			<div class="list-rows">
				<div class="row" v-for="(row, index) in $tm('presentation.IDE.listRows')">
					<div class="number">
						<p>{{ index + 1 }}</p>
					</div>
					<p class="text">{{ row.text }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
#Presentation {
	margin: 0 auto;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	& > div {
		width: 600px;

		display: flex;
		flex-direction: column;
		align-items: flex-end;
		height: 100%;
	}

	#Me {
		& > div {
			height: 100%;

			h2 {
				font-size: 2.5rem;
				font-weight: 600;
				color: $color-font;
			}
			h3 {
				background-position: 50% 50%;
				background-color: #66aeab;
				background-image: url("/img/background-name.gif");
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				-moz-background-clip: text;
				-moz-text-fill-color: transparent;

				font-size: 4rem;
				font-weight: 700;
			}
			p {
				margin-top: 10px;
				font-size: 1.3rem;
				font-weight: 300;
				color: $color-font;
			}

			#download-CV {
				text-align: center;
				display: inline-block;
				width: 100%;
				margin-top: 20px;
				padding: 10px 20px;
				border-radius: 5px;
				background-color: $color-secondary-background;
				color: $color-font;
				font-size: 1.2rem;
				font-weight: 500;
				text-decoration: none;
				transition: background-color 0.2s ease-in-out;

				&:hover {
					background-color: lighten($color-secondary-background, 5%);
				}
			}
		}
	}

	#IDE {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 35px 1fr;

		background: #292d3e;

		border-radius: 5px;

		&:hover header {
			background: #222;
		}

		header {
			position: relative;
			height: 100%;
			width: 100%;
			background: #2c2c2c;
			border-radius: 5px 5px 0 0;
			transition: background 0.2s ease-in-out;

			.title {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				margin: 0;
				font-size: 1rem;
				font-weight: 600;
				color: #eee;
			}

			#list-action {
				position: absolute;
				left: 15px;
				top: 0;
				height: 100%;

				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: left;
				gap: 10px;

				& > div {
					width: 12px;
					height: 12px;
					border-radius: 50%;
					cursor: pointer;
				}

				#close {
					background-color: #ff5d59;
				}

				#reduct {
					background-color: #fdbf38;
				}

				#full {
					background-color: #24c841;
				}
			}
		}

		.list-rows {
			display: flex;
			flex-direction: column;
			padding: 10px 5px;
			overflow-y: auto;
			width: 100%;
			overflow-y: auto;

			.row {
				display: grid;
				grid-template-columns: 20px 1fr;
				grid-gap: 10px;
				font-family: $font-family-mono;

				.number {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					justify-content: flex-start;
					height: 100%;
					width: 100%;
					overflow: hidden;

					p {
						margin: 0;
						font-size: 0.85rem;
						font-weight: 400;
						color: #4c5063;
					}
				}
				.text {
					margin: 0;
					font-size: 0.85rem;
					font-weight: 400;
					color: #bfc7d5;
				}

				&:hover {
					.number {
						p {
							color: #fff;
						}
					}
					.text {
						background: #212432;
					}
				}
			}
		}

		::-webkit-scrollbar {
			width: 12px;
		}
		::-webkit-scrollbar-track {
			background: hsl(229, 0%, 20%);
		}
		::-webkit-scrollbar-thumb {
			background: hsla(0, 0%, 0%, 30%);
			border-radius: 0px;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	}
}
</style>
