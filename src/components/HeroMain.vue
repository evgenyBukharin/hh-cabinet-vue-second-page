<template>
	<section class="hero">
		<div class="container hero__container">
			<HeroFilters @redraw-slider="redrawSlider()" @search-input-filter="searchInputFilter()" />
			<div class="hero__table">
				<div class="hero__header">
					<div class="hero__row">
						<div class="hero__cell hero__cell-header hero__col-vacancy">Вакансия</div>
						<div class="hero__cell hero__cell-header hero__cell-header-name hero__col-name">ФИО</div>
						<div class="hero__cell hero__cell-header hero__col-phone">Телефон</div>
						<div class="hero__cell hero__cell-header hero__col-job">Должность</div>
						<div class="hero__cell hero__cell-header hero__col-salary">ЗП</div>
						<div class="hero__cell hero__cell-header hero__col-city">Город</div>
						<div class="hero__cell hero__cell-header hero__cell-header-buttons hero__col-buttons">
							<input
								class="hero__input-checkbox"
								type="checkbox"
								id="switch"
								v-model="switchText"
								@change="switchRowData()"
							/><label class="hero__label" for="switch"> Toggle </label>
							<span class="hero__text-buttons">{{ actualText[switchText] }}</span>
						</div>
					</div>
				</div>
				<swiper
					:modules="modules"
					:navigation="mainSliderOptions.navigation"
					:pagination="mainSliderOptions.pagination"
					:thumbs="{ swiper: thumbsSwiper }"
					:slides-per-view="mainSliderOptions.slidesPerView"
					:speed="mainSliderOptions.speed"
				>
					<swiper-slide v-for="(slide, idx) in $store.state.preparedSlides" :key="idx">
						<div class="hero__row" v-for="(row, idx) in slide" :key="idx">
							<div class="hero__cell hero__col-vacancy">{{ row.vacancy }}</div>
							<div class="hero__cell hero__col-name">{{ row.name }}</div>
							<div class="hero__cell hero__col-phone">
								<a href="tel:+79080788723">{{ row.phone }}</a>
							</div>
							<div class="hero__cell hero__col-job">{{ row.job }}</div>
							<div class="hero__cell hero__col-salary">{{ row.salary }}</div>
							<div class="hero__cell hero__col-city">{{ row.city }}</div>
							<div class="hero__cell hero__col-buttons">
								<a
									:href="row.hhLink"
									target="_blank"
									class="hero__container-button"
									@mouseenter="toggleActive"
									@mouseleave="toggleActive"
								>
									<div class="hero__container-icon">
										<svg
											viewBox="0 0 25 25"
											class="hero__icon-user"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect width="25" height="25" rx="5" />
											<path
												class="hero__icon-user-inner"
												d="M12.6 14.222c3.037 0 5.6.493 5.6 2.397 0 1.905-2.58 2.381-5.6 2.381-3.036 0-5.6-.494-5.6-2.398 0-1.904 2.58-2.38 5.6-2.38zM12.6 5a3.691 3.691 0 013.706 3.704 3.692 3.692 0 01-3.706 3.704 3.692 3.692 0 01-3.706-3.704A3.692 3.692 0 0112.6 5z"
											/>
										</svg>
									</div>
									<div class="hero__container-button-inner">Перейти</div>
								</a>
								<a
									href="https://google.com"
									class="hero__container-button hero__container-button-active"
									@mouseenter="toggleActive"
									@mouseleave="toggleActive"
								>
									<div class="hero__container-icon">
										<svg
											class="hero__icon-plus"
											viewBox="0 0 14 14"
											id="plus"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M10.062 0c2.334 0 3.665 1.318 3.665 3.658v6.41c0 2.328-1.325 3.66-3.658 3.66h-6.41C1.317 13.727 0 12.395 0 10.067v-6.41C0 1.318 1.318 0 3.658 0h6.404zM6.857 3.782a.568.568 0 00-.57.57v1.935H4.345a.595.595 0 00-.405.165.579.579 0 00.405.981h1.942v1.943a.57.57 0 101.14 0V7.433h1.949a.579.579 0 00.57-.576.568.568 0 00-.57-.57h-1.95V4.352a.568.568 0 00-.57-.57z"
											/>
										</svg>
									</div>
									<div class="hero__container-button-inner">CRM</div>
								</a>
								<div
									class="hero__container-button"
									@mouseenter="toggleActive"
									@mouseleave="toggleActive"
								>
									<div class="hero__container-icon">
										<svg
											v-if="$store.state.hideHiddenData"
											class="hero__icon-minus"
											viewBox="0 0 13 13"
											id="minus"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M9.529 0C11.739 0 13 1.248 13 3.465v6.07C13 11.74 11.745 13 9.536 13H3.465C1.248 13 0 11.739 0 9.536V3.465C0 1.248 1.248 0 3.465 0h6.064zM4.114 5.954H8.88c.299 0 .54.24.54.54a.549.549 0 01-.54.546H4.115a.548.548 0 01-.384-.93.564.564 0 01.383-.156z"
											/>
										</svg>
										<svg
											v-else
											class="hero__icon-minus"
											viewBox="0 0 25 25"
											id="reverse-arrow"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect width="25" height="25" rx="5" />
											<path
												fill="white"
												d="M4.5 12.866a1 1 0 010-1.732l6-3.464a1 1 0 011.5.866v6.928a1 1 0 01-1.5.866l-6-3.464zM14 12a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1z"
											/>
										</svg>
									</div>
									<div
										class="hero__container-button-inner"
										v-if="$store.state.hideHiddenData"
										@click="hideRow(row.id)"
									>
										Скрыть
									</div>
									<div class="hero__container-button-inner" v-else @click="returnRow(row.id)">
										Вернуть
									</div>
								</div>
							</div>
						</div>
					</swiper-slide>
				</swiper>
				<div class="hero__footer">
					<p class="hero__text-all hero__text-footer">
						Всего:
						<span class="hero__text-footer hero__text-all-value">{{ $store.state.rowsData.length }}</span>
					</p>
					<div class="hero__text-pages hero__text-footer">
						<span class="hero__text-page">
							Страницы:
							<span class="hero__text-page" v-show="preparedSlides.length == 1">1</span>
						</span>
						<button class="btn-reset hero__button-control hero__button-prev">Пред</button>
						<swiper
							class="hero__slider-pagination"
							:slides-per-view="bulletsSliderOptions.slidesPerView"
							:speed="bulletsSliderOptions.speed"
							:space-between="bulletsSliderOptions.spaceBetween"
							:clickable="bulletsSliderOptions.clickable"
							:centered-slides="bulletsSliderOptions.centeredSlides"
							wrapper-class="hero__pagination swiper-wrapper"
							:modules="modules"
							watchSlidesProgress
							@swiper="setThumbsSwiper"
						>
						</swiper>
						<button class="btn-reset hero__button-control hero__button-next">След.</button>
						<button
							class="btn-reset hero__button-control hero__button-last"
							@click="moveToLastSlide"
							v-show="preparedSlides.length > 1"
						>
							Последняя
						</button>
					</div>
					<p class="hero__text-onpage hero__text-footer">
						На странице:
						<select class="hero__select" v-model="$store.state.rowsPerSlide">
							<option v-for="(item, idx) in $store.state.pageCountOptions" :key="idx" :value="item">
								{{ item }}
							</option>
						</select>
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import HeroFilters from "./HeroFilters.vue";

import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Thumbs, Controller } from "swiper/modules";

import "swiper/css/bundle";

export default {
	name: "HeroMain",
	data() {
		return {
			switchText: false,
			actualText: {
				false: "Актуальные отклики",
				true: "Скрытые отклики",
			},
			mainSliderOptions: {
				slidesPerView: 1,
				speed: 700,
				pagination: {
					el: ".hero__pagination",
					clickable: true,
					renderBullet: function (index, className) {
						return `<span class="hero__bullet swiper-slide ${className}">${index + 1}</span>`;
					},
				},
				navigation: {
					nextEl: ".hero__button-next",
					prevEl: ".hero__button-prev",
				},
				thumbs: {
					swiper: this.bulletsSlider,
				},
			},
			bulletsSliderOptions: {
				slidesPerView: 3,
				speed: 600,
				spaceBetween: 26,
				clickable: true,
				centeredSlides: false,
				navigation: {
					nextEl: ".hero__button-next",
					prevEl: ".hero__button-prev",
				},
			},
			modules: [Navigation, Pagination, Thumbs, Controller],
		};
	},
	components: { HeroFilters, Swiper, SwiperSlide },
	setup() {
		const thumbsSwiper = ref(null);
		const mainSwiper = ref(null);
		const setThumbsSwiper = (swiper) => {
			thumbsSwiper.value = swiper;
		};
		const setMainSwiper = (swiper) => {
			mainSwiper.value = swiper;
		};
		return {
			Thumbs,
			thumbsSwiper,
			setThumbsSwiper,
			mainSwiper,
			setMainSwiper,
		};
	},
	methods: {
		makeHovers() {
			const names = document.querySelectorAll(".hero__col-name");
			const phones = document.querySelectorAll(".hero__col-phone");
			const jobs = document.querySelectorAll(".hero__col-job");
			const vacancy = document.querySelectorAll(".hero__col-vacancy");
			const salaries = document.querySelectorAll(".hero__col-salary");
			const cities = document.querySelectorAll(".hero__col-city");
			const buttons = document.querySelectorAll(".hero__col-buttons");

			const cols = [names, phones, jobs, vacancy, salaries, cities, buttons];

			for (let i = 0; i < cols.length; i++) {
				cols[i].forEach((hoverElement) => {
					hoverElement.onmouseenter = () => {
						cols[i].forEach((el) => {
							el.classList.add("hero__cell-hovered");
						});
						if (cols[i - 1]) {
							cols[i - 1][0].classList.add("hero__cell-header-hide-after");
						}
						if (cols[i]) {
							cols[i][0].classList.add("hero__cell-header-hide-after");
						}
					};
					hoverElement.onmouseleave = () => {
						cols[i].forEach((el) => {
							el.classList.remove("hero__cell-hovered");
						});
						if (cols[i - 1]) {
							cols[i - 1][0].classList.remove("hero__cell-header-hide-after");
						}
						if (cols[i]) {
							cols[i][0].classList.remove("hero__cell-header-hide-after");
						}
					};
				});
			}
		},
		moveToLastSlide() {
			const bullets = document.querySelectorAll(".hero__bullet");
			bullets[bullets.length - 1].click();
		},
		toggleActive(event) {
			const hoveredButton = event.target;
			if (!hoveredButton.classList.contains("hero__container-button-active")) {
				let children = hoveredButton.parentNode.querySelectorAll(".hero__container-button");
				children.forEach((child) => {
					child.classList.remove("hero__container-button-active");
				});
				hoveredButton.classList.add("hero__container-button-active");
			}
		},
		hideRow(id) {
			this.$store.commit("hideRow", id);
			this.redrawSlider();
		},
		returnRow(id) {
			this.$store.commit("returnRow", id);
			this.redrawSlider();
		},
		switchRowData() {
			this.$store.commit("switchRowData");
			this.redrawSlider();
		},
		redrawSlider() {
			this.$store.commit("clearPreparedSlides");
			if (this.$store.state.selectedStatus !== "Все неразобранные") {
				this.$store.commit("setNewFilterStatus", this.$store.state.selectedStatus);
			} else {
				this.$store.commit("clearFilterModelStatus");
			}

			if (this.$store.getters.isModelEmpty) {
				this.$store.commit("makePreparedSlides", this.$store.state.rowsData);
			} else {
				this.$store.commit("makeFilteredSlides", this.$store.state.rowsData);
			}
		},
		searchInputFilter() {
			this.$store.commit("searchInputFilter");
		},
	},
	mounted() {
		this.$store.commit("makePreparedSlides", this.$store.state.rowsData);
		setTimeout(() => {
			this.makeHovers();
			const heroPagination = document.querySelector(".hero__pagination");
			heroPagination.style.transform = "transform: translate3d(0px, 0px, 0px);";
		}, 0);
	},
	computed: {
		rowsPerSlide() {
			return this.$store.state.rowsPerSlide;
		},
		preparedSlides() {
			return this.$store.state.preparedSlides;
		},
	},
	watch: {
		rowsPerSlide() {
			this.redrawSlider();
		},
	},
};
</script>

<style lang="scss">
.swiper-pagination-bullet-active {
	color: var(--blue-color);
}
.hero {
	padding-top: 50px;
	padding-bottom: 50px;
	min-height: 700px;
	&__container {
		&-button {
			display: flex;
			align-items: center;
			font-size: 10px !important;
			font-weight: 600 !important;
			line-height: 12px !important;
			color: var(--black-color) !important;
			text-align: center;
			max-width: 100px;
			width: 25px;
			cursor: pointer;
			overflow: hidden;
			transition: width 0.2s linear;
			border: 1px solid var(--green-color);
			border-radius: 5px;
			height: 25px;
			&-active {
				width: 100px;
				& .hero__container-button-inner {
					opacity: 1;
				}
			}
			&-inner {
				text-align: center;
				position: relative;
				z-index: 50;
				width: 75px;
				transition: opacity 0.2s linear 0.2s;
				opacity: 0;
			}
		}
		&-icon {
			// background: var(--green-color);
			height: 100%;
		}
	}
	&__table {
		width: 100%;
		border-spacing: 0;
		outline: 1px solid var(--border-color);
		outline-offset: -1px;
		border-radius: 5px;
	}
	&__header {
		border-radius: 5px;
		background: var(--green-color);
		& .hero__cell {
			&:first-child {
				border-top-left-radius: 5px;
				border-bottom-left-radius: 5px;
			}
			&:last-child {
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px;
			}
		}
		& .hero__row {
			& .hero__cell {
				&:first-child {
					border-left: 1px solid var(--green-color) !important;
				}
				&:last-child {
					border-right: 1px solid var(--green-color) !important;
				}
			}
		}
	}
	&__cell {
		display: flex;
		align-items: center;
		text-align: center;
		padding: 19px 6px;
		font-size: 14px;
		line-height: 17px;
		letter-spacing: 0em;
		color: var(--black-color);
		border-right: 1px solid transparent;
		border-left: 1px solid transparent;
		transition: border 0.2s ease;
		&-header {
			position: relative;
			font-size: 16px;
			font-weight: 700;
			line-height: 120%;
			padding-top: 20px;
			padding-bottom: 20px;
			color: var(--white-color);
			justify-content: center;
			border: 1px solid var(--green-color);
			&-buttons {
				background: var(--white-color);
				border-radius: 5px;
			}
			&-hide-after {
				&::after {
					opacity: 0;
				}
			}
			&:not(:last-child) {
				&::after {
					content: "";
					position: absolute;
					right: -1px;
					top: 50%;
					transform: translateY(-50%);
					background: var(--border-color);
					width: 1px;
					height: 55%;
					transition: opacity 0.4s ease;
				}
			}
		}
		&-hovered {
			border-right: 1px solid var(--border-color);
			border-left: 1px solid var(--border-color);
		}
		& a {
			font-size: inherit;
			line-height: inherit;
			font-weight: inherit;
			color: inherit;
			text-decoration: none;
		}
	}
	&__col {
		box-sizing: border-box;
		&-vacancy {
			box-sizing: border-box;
			max-width: 240px;
			width: 100%;
			justify-content: center;
		}
		&-name {
			box-sizing: border-box;
			text-align: center;
			max-width: 200px;
			width: 100%;
		}
		&-phone {
			box-sizing: border-box;
			white-space: nowrap;
			max-width: 180px;
			width: 100%;
			justify-content: center;
		}
		&-job {
			box-sizing: border-box;
			max-width: 240px;
			width: 100%;
			justify-content: center;
		}
		&-salary {
			box-sizing: border-box;
			max-width: 80px;
			width: 100%;
			justify-content: center;
		}
		&-city {
			box-sizing: border-box;
			max-width: 170px;
			width: 100%;
			justify-content: center;
		}
		&-buttons {
			position: relative;
			box-sizing: border-box;
			max-width: 190px;
			min-width: 190px;
			width: 100%;
			display: flex;
			gap: 10px;
			padding-left: 15px;
			& .hero__label {
				cursor: pointer;
				text-indent: -9999px;
				min-width: 40px;
				min-height: 20px;
				width: 40px;
				height: 20px;
				display: block;
				background: var(--white-color);
				position: relative;
				border: 1px solid var(--orange-color);
				border-radius: 5px;
				&::after {
					content: "";
					position: absolute;
					top: 0;
					left: -1px;
					width: 20px;
					height: 100%;
					background: var(--orange-color);
					border-radius: 5px;
					transition: 0.3s;
				}
			}
			& .hero__input {
				&-checkbox {
					position: absolute;
					top: -1px;
					left: -1px;
					height: 0;
					width: 0;
					visibility: hidden;
					&:checked + label:after {
						left: calc(100% + 2px);
						transform: translateX(-100%);
					}
				}
			}
		}
	}
	&__row {
		display: flex;
		&:not(:first-child) {
			box-shadow: 0 -1px 0 var(--border-color);
		}
		& .hero__cell {
			&:first-child {
				padding-left: 9px;
				border-left: 1px solid transparent !important;
			}
			&:last-child {
				border-right: 1px solid transparent !important;
				padding-right: 9px;
			}
		}
	}
	&__icon {
		&-plus {
			min-width: 25px;
			min-height: 25px;
			width: 25px;
			height: 25px;
			fill: var(--green-color);
			position: relative;
			z-index: 100;
			margin-left: -1px;
			margin-top: -1px;
		}
		&-minus {
			position: relative;
			min-width: 25px;
			min-height: 25px;
			width: 25px;
			height: 25px;
			fill: var(--green-color);
			z-index: 100;
			margin-left: -1px;
			margin-top: -1px;
		}
		&-user {
			min-width: 25px;
			min-height: 25px;
			width: 25px;
			height: 25px;
			fill: var(--green-color);
			position: relative;
			z-index: 100;
			margin-left: -1px;
			margin-top: -1px;
			&-inner {
				fill: var(--white-color);
			}
		}
	}
	&__text {
		&-buttons {
			font-size: 10px;
			font-weight: 700;
			line-height: 12px;
			color: var(--orange-color);
			min-width: 115px;
			text-align: left;
			white-space: nowrap;
		}
	}
	&__slider {
		&-pagination {
			max-width: 82px;
		}
	}
	&__text {
		&-pages {
			position: relative;
			display: flex;
			align-items: center;
		}
		&-page {
			margin-right: 11px;
		}
		&-footer {
			font-family: var(--second-family);
			font-size: 11px;
			font-weight: 600;
			line-height: 15px;
			text-transform: uppercase;
			margin: 0;
		}
	}
	&__footer {
		border-top: 1px solid rgba(225, 83, 53, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22px;
	}
	&__button {
		&-control {
			font-family: var(--second-family);
			font-size: 11px;
			font-weight: 600;
			line-height: 15px;
			text-transform: uppercase;
			&:disabled {
				color: var(--black-color);
			}
		}
		&-prev {
			margin-right: 25px;
		}
		&-next {
			margin-left: 27px;
		}
		&-last {
			position: relative;
			margin-left: 27px;
			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: -13px;
				height: 100%;
				width: 1px;
				background: var(--black-color);
				font-weight: 700;
			}
		}
	}
	&__pagination {
		position: relative;
		bottom: unset !important;
		left: unset !important;
	}
	&__bullet {
		display: block;
		position: relative;
		background: transparent;
		font-family: var(--second-family);
		font-size: 13px;
		font-weight: 600;
		line-height: 15px;
		margin-left: 0 !important;
		opacity: 1;
		height: 100% !important;
		line-height: 18px;
		transition: color 0.3s linear;
		&:last-child {
			margin-right: 0 !important;
		}
		&:first-child {
			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: -13px;
				height: 100%;
				width: 1px;
				background: var(--black-color);
				font-weight: 700;
			}
		}
		&::after {
			content: "";
			position: absolute;
			top: 0;
			right: -13px;
			height: 100%;
			width: 1px;
			background: var(--black-color);
			font-weight: 700;
		}
		&-active {
			color: var(--blue-color);
		}
	}
	&__select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		padding: 5px 49px 5px 15px;
		border-radius: 2px;
		border: 1px solid rgba(0, 0, 0, 0.25);
		font-family: var(--second-family);
		font-size: 12px;
		font-weight: 400;
		margin-left: 11px;
		background: url("../img/down-arrow.svg") no-repeat var(--white-color);
		background-size: 17px 9px;
		background-position-x: 75%;
		background-position-y: 50%;
		&::-ms-expand {
			display: none;
		}
	}
}

.list-reset {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>
