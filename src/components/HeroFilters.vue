<template>
	<div class="filters hero__filters">
		<div class="filters__container">
			<div class="filters__container-switch" :class="{ 'filters__container-switch-hidden': isInputActive }">
				<label class="switch">
					<input
						type="checkbox"
						id="switch-input"
						@change="isSwitchActive = !isSwitchActive"
						checked="checked"
						disabled
					/>
					<span
						class="slider round"
						:class="{
							'switch-active': isSwitchActive,
						}"
					>
						<a href="./replies.html" target="_blank" class="filters__text-switch switch__text">Отклики</a>
						<span class="filters__text-switch switch__text">Избранное</span>
					</span>
				</label>
			</div>
			<div class="filters__container-filters" :class="{ 'filters__container-filters-active': isInputActive }">
				<input
					@click="isInputActive = true"
					type="text"
					class="filters__input-search"
					placeholder="Фильтр + поиск"
					v-model="$store.state.searchPhrase"
					@keyup.enter="handleSearchInput()"
				/>
				<button class="filters__button-search" @click="handleSearchInput()">Найти</button>
			</div>
		</div>
		<div class="filters__container-main" :class="{ 'filters__container-main-active': isInputActive }">
			<div class="filters__list">
				<div class="filters__item" v-for="(category, idx) in $store.state.categotyFilterList" :key="idx">
					<h4 class="filters__title filters__title-category">{{ category.ru }}</h4>
					<div class="filters__categories">
						<simplebar data-simplebar-auto-hide="false" style="max-height: 81px">
							<div
								class="filters__category"
								v-for="(item, idx) in getUniqueItems(category.en)"
								:key="idx"
							>
								<input
									class="filters__checkbox"
									type="checkbox"
									:value="{ category: category.en, value: item }"
									:id="item + idx"
									@change="newFilterHandler({ category: category.en, value: item }, $event)"
								/>
								<label class="filters__label" :for="item + idx"></label>
								{{ item }}
							</div>
						</simplebar>
					</div>
				</div>
			</div>
			<div class="filters__container-buttons">
				<button class="filters__button filters__button-clear" @click="removeAllFilters()" ref="clearButton">
					Сбросить
				</button>
				<button class="filters__button filters__button-apply" @click="filterRowsData()" ref="applyButton">
					Применить
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
export default {
	name: "HeroFilters",
	data() {
		return {
			isSwitchActive: true,
			isInputActive: false,
			listVisiblity: false,
			blockToggleCheckbox: false,
		};
	},
	components: {
		simplebar,
	},
	emits: ["redrawSlider", "searchInputFilter"],
	methods: {
		getUniqueItems(category) {
			const result = this.$store.state.rowsData.reduce((acc, item) => {
				if (acc.includes(item[category])) {
					return acc;
				}
				return [...acc, item[category]];
			}, []);
			return result;
		},
		newFilterHandler(filterData, event) {
			if (!this.blockToggleCheckbox) {
				let filterIndex = this.checkExistingFilter(filterData);
				if (filterIndex == -1) {
					this.$store.commit("addNewFilter", filterData);
				} else {
					this.$store.commit("deleteOldFilter", filterData);
				}
				this.blockToggleCheckbox = true;
				setTimeout(() => {
					this.blockToggleCheckbox = false;
				}, 300);
				event.target.classList.toggle("filters__checkbox-active");
			}
		},
		checkExistingFilter(filterData) {
			let index = this.$store.state.filterModel[filterData.category].findIndex((filter) => {
				return filter == filterData.value;
			});
			return index;
		},
		removeAllFilters() {
			this.removeAllChecked();
			this.isInputActive = false;
			this.$store.commit("clearFilterModel");
			this.updateSlider();
		},
		filterRowsData() {
			this.isInputActive = false;
			this.updateSlider();
		},
		removeAllChecked() {
			const checkedCheckboxes = document.querySelectorAll(".filters__checkbox-active");
			checkedCheckboxes.forEach((checkbox) => {
				checkbox.classList.remove("filters__checkbox-active");
			});
		},
		updateSlider() {
			this.$emit("redrawSlider");
		},
		toggleListVisibility() {
			this.listVisiblity = !this.listVisiblity;
		},
		handleSearchInput() {
			this.removeAllChecked();
			this.$store.commit("clearFilterModel");
			this.$emit("searchInputFilter");
			this.updateSlider();
		},
	},
};
</script>

<style lang="scss">
.filters {
	margin-bottom: 25px;
	&__container {
		display: flex;
		gap: 25px;
		&-switch {
			position: relative;
			&-hidden {
				display: none;
			}
		}
		&-filters {
			width: 100%;
			position: relative;
			border: 1px solid var(--green-color);
			border-radius: 10px;
		}
		&-buttons {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			gap: 25px;
		}
		&-main {
			border-radius: 10px;
			display: none;
			border: 0;
			padding: 0;
			max-width: 1140px;
			&-active {
				border: 1px solid var(--green-color);
				padding: 20px;
				padding-left: 25px;
				margin-top: 25px;
				display: block;
			}
		}
	}
	&__input {
		&-search {
			width: calc(100% - 150px);
			height: 100%;
			border-radius: 10px;
			background: var(--white-color);
			padding: 10px;
			display: flex;
			color: var(--black-color);
			font-size: 24px;
			font-weight: 400;
			outline: none;
			border: none;
			&::placeholder {
				color: rgba(0, 0, 0, 0.25);
				font-size: 24px;
				font-weight: 400;
			}
		}
		&-select {
			font-size: 18px;
			font-weight: 400;
			line-height: 22px;
			text-align: center;
			width: 100%;
			height: 100%;
			border-radius: 10px;
			border: 1px solid var(--orange-color);
			background: var(--white-color);
			padding: 15px;
			padding-right: 36px;
			cursor: pointer;
			transition: border-radius 0.3s ease;
			outline: none;
			&-active {
				border-radius: 5px;
			}
		}
	}
	&__title {
		margin: 0;
		&-category {
			color: var(--black-color);
			font-size: 18px;
			line-height: 120%;
			font-weight: 400;
		}
	}
	&__list {
		display: flex;
		gap: 45px;
		margin-bottom: 25px;
		&-select {
			display: flex;
			flex-direction: column;
			gap: 10px;
			padding: 20px;
			background: var(--white-color);
			border-radius: 5px;
			border: 1px solid var(--orange-color);
			list-style: none;
			margin: 0;
			position: absolute;
			top: 60px;
			left: 0;
			right: 0;
			z-index: 100;
			opacity: 0;
			visibility: hidden;
			transition: opacity 0.3s ease, visibility 0.3s ease;
			&-active {
				opacity: 1;
				visibility: visible;
			}
		}
	}
	&__item {
		display: flex;
		gap: 25px;
		&-select {
			border-radius: 3px;
			border: 1px solid rgba(225, 83, 53, 0.25);
			background: var(--white-color);
			padding: 5px 19px;
			color: var(--black-color);
			text-align: center;
			font-size: 14px;
			line-height: 120%;
			width: 100%;
			transition: background 0.3s ease;
			&:hover {
				background: var(--light-blue-color);
			}
		}
	}
	&__categories {
		border-radius: 10px;
		border: 1px solid var(--light-green-color);
		background: var(--white-color);
		padding: 10px;
		width: 100%;
		min-width: 280px;
		& .filters__category {
			&:not(:last-child) {
				margin-bottom: 7px;
			}
		}
	}
	&__category {
		color: var(--black-color);
		font-size: 12px;
		font-weight: 400;
		line-height: 120%;
		display: flex;
		align-items: center;
		gap: 6px;
		position: relative;
	}
	&__label {
		display: block;
		position: relative;
		min-width: 15px;
		min-height: 15px;
		width: 15px;
		height: 15px;
		border: 1px solid var(--light-green-color);
		border-radius: 5px;
		cursor: pointer;
		z-index: 25;
		&::before {
			content: "";
			position: absolute;
			top: 44%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(45deg);
			width: 4px;
			height: 8px;
			border: solid var(--white-color);
			border-width: 0 2px 2px 0;
			opacity: 0;
			transition: opacity 0.3s;
			z-index: 100;
		}
		&::after {
			content: "";
			position: absolute;
			inset: -1px;
			opacity: 0;
			transition: opacity 0.3s;
			background: var(--green-color);
			border-radius: 5px;
			z-index: 50;
		}
	}
	&__checkbox {
		position: absolute;
		width: 0;
		height: 0;
		top: -1px;
		left: -1px;
		overflow: hidden;
		opacity: 0;
		visibility: hidden;
		&-active {
			& ~ .filters__label::before,
			& ~ .filters__label::after {
				opacity: 1;
			}
		}
	}
	&__button {
		padding: 3px 15px;
		border-radius: 5px;
		font-size: 14px;
		font-weight: 700;
		line-height: 17px;
		color: var(--white-color);
		border: 0;
		outline: 0;
		cursor: pointer;
		&-clear {
			background: var(--orange-color);
		}
		&-apply {
			background-color: var(--green-color);
		}
		&-search {
			padding: 14px;
			width: 150px;
			background: var(--orange-color);
			outline: none;
			border: none;
			position: absolute;
			top: -1px;
			bottom: -1px;
			right: -1px;
			border-radius: 10px;
			color: var(--white-color);
			text-align: center;
			font-size: 18px;
			font-weight: 400;
			cursor: pointer;
		}
	}
}

.simplebar-track.simplebar-vertical {
	width: 2px;
	background: #d9d9d9;
}
.simplebar-scrollbar {
	width: 2px;
	background: var(--green-color);
}

.switch {
	position: relative;
	display: inline-block;
	width: 300px;
	height: 50px;
	&__text {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50%;
		z-index: 100;
		color: var(--black-color);
		transition: color 0.4s;
		font-size: 18px;
		font-weight: 400;
		line-height: 22px;
		text-decoration: none;
		&:first-child {
			color: var(--white-color);
		}
		&:last-child {
			color: var(--black-color);
		}
	}
	&-active {
		& .switch__text {
			&:first-child {
				color: var(--black-color);
			}
			&:last-child {
				color: var(--white-color);
			}
		}
	}
}
/* Hide default HTML checkbox */
.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

/* The slider */
.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: var(--white-color);
	transition: all 0.4s;
	border: 1px solid var(--orange-color);
	border-radius: 10px;
	display: flex;
}

.slider:before {
	position: absolute;
	content: "";
	height: 100%;
	width: 50%;
	left: -1px;
	bottom: 0;
	background: var(--orange-color);
	transition: all 0.4s;
}

input:checked + .slider:before {
	transform: translateX(102%);
}

/* Rounded sliders */
.slider.round:before {
	border-radius: 10px;
}
</style>
