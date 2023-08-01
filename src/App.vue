<template>
	<HeroMain />
	<DataWaiter />
</template>

<script>
import HeroMain from "./components/HeroMain.vue";
import DataWaiter from "./components/DataWaiter.vue";

export default {
	name: "App",
	components: {
		HeroMain,
		DataWaiter,
	},
	mounted() {
		this.$store.commit("saveRowsData");
		this.$store.state.isDataLoading = false;
	},
};
</script>

<style lang="scss">
#app {
	position: relative;
}
:root {
	--font-family: "Montserrat", sans-serif;
	--second-family: "Open Sans", sans-serif;
	--content-width: 1300px;
	--container-offset: 20px;
	--container-width: calc(var(--content-width) + (var(--container-offset) * 2));
	--white-color: #fff;
	--black-color: #000;
	--green-color: #299b9c;
	--blue-color: #254580;
	--light-blue-color: #81eaeb;
	--border-color: #e153351a;
	--orange-color: #e15335;
	--light-green-color: rgba(41, 155, 156, 0.25);
}
@font-face {
	font-family: Montserrat;
	src: url(assets/fonts/Montserrat-Regular.woff2) format("woff2");
	font-weight: 400;
	font-display: swap;
	font-style: normal;
}
@font-face {
	font-family: Montserrat;
	src: url(assets/fonts/Montserrat-Bold.woff2) format("woff2");
	font-weight: 700;
	font-display: swap;
	font-style: bold;
}
@font-face {
	font-family: "Open Sans";
	src: url(assets/fonts/OpenSans-Regular.woff2) format("woff2");
	font-weight: 400;
	font-display: swap;
	font-style: normal;
}
@font-face {
	font-family: "Open Sans";
	src: url(assets/fonts/OpenSans-SemiBold.woff2) format("woff2");
	font-weight: 700;
	font-display: swap;
	font-style: bold;
}
html {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
*,
::after,
::before {
	-webkit-box-sizing: inherit;
	box-sizing: inherit;
}
.page {
	height: 100%;
	font-family: var(--font-family, sans-serif);
	-webkit-text-size-adjust: 100%;
}
.page__body {
	margin: 0;
	min-width: 320px;
	min-height: 100%;
	font-size: 16px;
}
.site-container {
	overflow: hidden;
}
.btn-reset {
	border: none;
	padding: 0;
	background-color: transparent;
	cursor: pointer;
}
.container {
	margin: 0 auto;
	padding: 0 var(--container-offset);
	max-width: var(--container-width);
}
</style>
