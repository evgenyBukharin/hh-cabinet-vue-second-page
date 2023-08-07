<template>
	<section class="loader" :class="{ 'loader-hidden': !$store.state.isDataLoading }">
		<div class="loader__container">
			<div class="loader__container-spinner">
				<span class="loader__spinner" v-show="$store.state.showSpinner"></span>
				<svg
					v-show="$store.state.showErrorIcon"
					width="200"
					height="200"
					viewBox="0 0 200 200"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="2.5" y="2.5" width="195" height="195" rx="97.5" stroke="#299B9C" stroke-width="5" />
					<rect x="70" y="66" width="91" height="5" rx="2.5" transform="rotate(45 70 66)" fill="#299B9C" />
					<rect
						x="134"
						y="69.5355"
						width="91"
						height="5"
						rx="2.5"
						transform="rotate(135 134 69.5355)"
						fill="#299B9C"
					/>
				</svg>
				<svg
					v-show="$store.state.showMessage"
					width="200"
					height="200"
					viewBox="0 0 200 200"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="2.5" y="2.5" width="195" height="195" rx="97.5" stroke="#299B9C" stroke-width="5" />
					<rect x="104" y="42" width="90" height="7" rx="3.5" transform="rotate(90 104 42)" fill="#299B9C" />
					<rect
						x="105"
						y="148.559"
						width="10"
						height="10"
						rx="5"
						transform="rotate(90 105 148.559)"
						fill="#299B9C"
					/>
				</svg>
			</div>
			<h3 class="loader__title">
				{{ $store.state.loaderText }}
			</h3>
			<h3 class="loader__title" v-show="$store.state.showTimeTitle">Это может занять какое-то время</h3>
			<div class="loader__list" v-show="$store.state.showErrorFilesList">
				<div class="loader__item" v-for="(item, idx) in getFilesDescr()" :key="idx">- {{ item }}</div>
			</div>
			<h3 class="loader__button" v-show="$store.state.showErrorFilesList" @click="reloadErroredPaths()">
				Повторить попытку
			</h3>
			<h3
				class="loader__button loader__button-ok"
				v-show="$store.state.showMessage"
				@click="$store.commit('hideLoader')"
			>
				ОК
			</h3>
		</div>
	</section>
	<div class="loader__replies" v-show="$store.state.loaderReplies">
		<div class="loader__reply" v-for="(item, idx) in $store.state.loaderReplies" :key="idx">
			<div class="loader__file">{{ item.file }}</div>
			<div class="loader__message">{{ item.message }}</div>
			<svg
				class="loader__icon-close"
				@click="removeReply(idx)"
				width="10"
				height="10"
				viewBox="0 0 10 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="5" cy="5" r="5" fill="#E15335" />
				<path d="M7.5 2.5L2.5 7.5" stroke="white" stroke-linecap="round" />
				<path d="M7.5 7.5L2.5 2.5" stroke="white" stroke-linecap="round" />
			</svg>
		</div>
	</div>
</template>

<script>
export default {
	name: "DataWaiter",
	methods: {
		reloadErroredPaths() {
			window.location.href =
				"https://hh.ru/oauth/authorize?response_type=code&client_id=PR0DIA47DE42CEAF62GU2FOUUNF808BL3OAU7QRSG276L01NQN7TA3J133HRS4G8&redirect_uri=https://b24-ost.ru/hr_integration_opti/index.php/";
		},
		getFilesDescr() {
			let filesDescrArray = [];
			this.$store.state.errorFilesList.forEach((path) => {
				filesDescrArray.push(this.$store.state.errorPaths[path]);
			});
			return filesDescrArray;
		},
		removeReply(idx) {
			this.$store.commit("removeReply", idx);
		},
	},
};
</script>

<style lang="scss">
.loader {
	z-index: 970;
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.8);
	display: flex;
	justify-content: center;
	opacity: 1;
	visibility: visible;
	transition: opacity 0.4s ease, visibility 0.4s ease;
	border-radius: 10px;
	&-hidden {
		opacity: 0;
		visibility: hidden;
	}
	&__container {
		margin-top: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
		&-spinner {
			width: 200px;
			height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 40px;
		}
	}
	&__title {
		color: var(--black-color);
		margin: 0;
		margin-bottom: 4px;
		font-size: 32px;
		font-weight: 600;
		line-height: 39px;
		text-align: center;
		max-width: 600px;
	}
	&__button {
		background: var(--green-color);
		padding: 15px 45px;
		border-radius: 15px;
		cursor: pointer;
		font-size: 24px;
		font-weight: 600;
		line-height: 29px;
		text-align: center;
		color: var(--white-color);
		margin: 0;
		margin-top: 30px;
		&-ok {
			padding: 15px 30px;
		}
	}
	&__list {
		margin-top: 30px;
	}
	&__item {
		font-size: 18px;
		font-weight: 600;
		line-height: 22px;
		text-align: center;
		&:not(:last-child) {
			margin-bottom: 15px;
		}
	}
	&__spinner {
		display: block;
		color: var(--green-color);
		font-size: 20px;
		width: 1em;
		height: 1em;
		border-radius: 50%;
		position: relative;
		text-indent: -9999em;
		animation: mulShdSpin 1.3s infinite linear;
		transform: translateZ(0);
	}
	&__replies {
		position: absolute;
		top: 30px;
		right: 30px;
		z-index: 970;
	}
	&__reply {
		padding: 14px 23px;
		border: 1px solid var(--green-color);
		border-radius: 10px;
		background: var(--white-color);
		position: relative;
		&:not(:last-child) {
			margin-bottom: 16px;
		}
	}
	&__file {
		font-size: 18px;
		font-weight: 600;
		line-height: 22px;
		margin-bottom: 6px;
	}
	&__message {
		width: 345px;
		font-size: 14px;
		font-weight: 500;
		line-height: 17px;
	}
	&__icon {
		&-close {
			position: absolute;
			top: 6px;
			right: 6px;
			cursor: pointer;
		}
	}
}

@keyframes mulShdSpin {
	0%,
	100% {
		box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em,
			-3em 0 0 -1em, -2em -2em 0 0;
	}
	12.5% {
		box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em,
			-3em 0 0 -1em, -2em -2em 0 -1em;
	}
	25% {
		box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em,
			-3em 0 0 -1em, -2em -2em 0 -1em;
	}
	37.5% {
		box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em,
			-3em 0em 0 -1em, -2em -2em 0 -1em;
	}
	50% {
		box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0,
			-3em 0em 0 -1em, -2em -2em 0 -1em;
	}
	62.5% {
		box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em,
			-3em 0 0 0, -2em -2em 0 -1em;
	}
	75% {
		box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0,
			-3em 0em 0 0.2em, -2em -2em 0 0;
	}
	87.5% {
		box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0,
			-3em 0em 0 0, -2em -2em 0 0.2em;
	}
}
</style>
