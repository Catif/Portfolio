<script setup>
const props = defineProps({
	project: {
		type: Object,
		required: true,
	},
});

const oddOrEven = props.project.id % 2 ? "odd" : "even";
</script>

<template>
	<div class="pinnedProject">
		<template v-if="oddOrEven === 'odd'">
			<div class="pinnedProject__image">
				<img :src="project.picture" alt="project image" />
			</div>
			<div class="pinnedProject__description">
				<h3>{{ project.name }}</h3>
				<p v-html="project.description"></p>
				<div class="pinnedProject__description__technologies">
					<span v-for="technology in project.technologies" :key="technology">
						{{ technology }}
					</span>
				</div>
				<a :href="project.github" target="_blank"><img src="/img/github-mark.svg" />Github</a>
			</div>
		</template>
		<template v-else>
			<div class="pinnedProject__description">
				<h3>{{ project.name }}</h3>
				<p v-html="project.description"></p>
				<div class="pinnedProject__description__technologies">
					<span v-for="technology in project.technologies" :key="technology">
						{{ technology }}
					</span>
				</div>
				<a :href="project.github" target="_blank"><img src="/img/github-mark.svg" />Github</a>
			</div>
			<div class="pinnedProject__image">
				<img :src="project.picture" alt="project image" />
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
.pinnedProject {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	justify-content: center;
	gap: 30px;
	padding: 20px 0px;
	width: 100%;
	&__image {
		width: 100%;
		max-width: 500px;
		height: auto;
		overflow: hidden;
		border-radius: 5px;

		aspect-ratio: 16 / 9;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	&__description {
		position: relative;
		width: 100%;
		max-width: 500px;
		padding-bottom: 50px;

		h3 {
			font-size: 1.5rem;
			font-weight: 500;
			color: $color-font;
		}
		p {
			margin-top: 5px;
			font-size: 1rem;
			font-weight: 300;
			color: $color-font;
		}
		&__technologies {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			gap: 10px;
			margin-top: 10px;
			span {
				font-size: 0.9rem;
				font-weight: 400;
				color: $color-font;
				background-color: $color-secondary-background;
				padding: 5px 10px;
				border-radius: 5px;
				border: 1px solid lighten($color-background, 10);

				&:hover {
					background-color: lighten($color-background, 10);
				}
			}
		}
		a {
			position: absolute;
			bottom: 0;
			width: 100%;
			color: $color-font;
			background-color: $color-background;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10px 0px;
			border-radius: 5px;

			img {
				width: 20px;
				height: 20px;
				margin-right: 10px;
				filter: brightness(0) invert(0.9);
				transition: all 0.2s ease-in-out;
			}

			transition: all 0.2s ease-in-out;

			&:hover {
				background-color: lighten($color-background, 10);
			}
		}
	}
}
</style>
