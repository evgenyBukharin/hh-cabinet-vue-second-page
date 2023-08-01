import { createStore } from "vuex";
import axios from "axios";

export default createStore({
	state: {
		rowsPerSlide: 5,
		preparedSlides: [],
		hiddenPreparedSlides: [],
		pageCountOptions: [5, 10, 15],
		searchPhrase: "",
		filterModel: {
			job: [],
			city: [],
		},
		categotyFilterList: [
			{
				en: "job",
				ru: "Должность",
			},
			{
				en: "city",
				ru: "Город",
			},
		],
		rowsData: [
			{
				id: 0,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Терапевт",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 1,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Уборщик",
				salary: "60 000",
				city: "Екатеринбург",
				hhLink: "https://google.com",
			},
			{
				id: 2,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Глав врач",
				salary: "60 000",
				city: "Алматы",
				hhLink: "https://google.com",
			},
			{
				id: 3,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Педиатор",
				salary: "60 000",
				city: "Екатеринбург",
				hhLink: "https://google.com",
			},
			{
				id: 4,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Дантист",
				salary: "60 000",
				city: "Москва",
				hhLink: "https://google.com",
			},
			{
				id: 5,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Уборщик",
				salary: "60 000",
				city: "Екатеринбург",
				hhLink: "https://google.com",
			},
			{
				id: 6,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Уборщик",
				salary: "60 000",
				city: "Алматы",
				hhLink: "https://google.com",
			},
			{
				id: 7,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Педиатор",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 8,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 9,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				salary: "60 000",
				city: "Алматы",
				hhLink: "https://google.com",
			},
			{
				id: 10,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				salary: "60 000",
				city: "Алматы",
				hhLink: "https://google.com",
			},
			{
				id: 11,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 12,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 13,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 14,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 15,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 16,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Уборщик",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 17,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Фронтендер",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
			},
			{
				id: 18,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Педиатор",
				salary: "60 000",
				city: "Москва",
				hhLink: "https://google.com",
			},
			{
				id: 19,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Педиатор",
				salary: "60 000",
				city: "Нью-Йорк",
				hhLink: "https://google.com",
			},
		],
		rowsDataHidden: [],
		savedRowsData: [],
		hideHiddenData: true,
		searchableKeys: ["name", "phone", "job", "city"],
		preSearchedRowsData: [],
		preSearchedHiddenRowsData: [],
		currentSearchCounter: 0,
		isRowsDataReady: false,
		isDataLoading: true,
		errorHappened: false,
		loaderText: "Данные загружаются...",
	},
	getters: {
		isModelEmpty(state) {
			const values = Object.values(state.filterModel);
			for (let i = 0; i < values.length; i++) {
				if (values[i].length !== 0) {
					return false;
				}
			}
			return true;
		},
	},
	mutations: {
		makePreparedSlides(state, array) {
			for (let i = 0; i < array.length; i += state.rowsPerSlide) {
				const chunk = array.slice(i, i + state.rowsPerSlide);
				state.preparedSlides.push(chunk);
			}
		},
		clearPreparedSlides(state) {
			state.preparedSlides = [];
		},
		addNewFilter(state, filterData) {
			state.filterModel[filterData.category].push(filterData.value);
		},
		deleteOldFilter(state, filterData) {
			let filterModelField = state.filterModel[filterData.category];
			filterModelField.splice(
				filterModelField.findIndex((filter) => {
					return filter == filterData.value;
				}),
				1
			);
		},
		makeFilteredSlides(state, array) {
			let matchedRowData = [];
			let lastFilteredKey = "";
			for (const key in state.filterModel) {
				if (Object.hasOwnProperty.call(state.filterModel, key)) {
					const filterModelEl = state.filterModel[key];
					if (filterModelEl.length > 0) {
						filterModelEl.forEach((filterValue) => {
							array.forEach((row) => {
								if (row[key] == filterValue) {
									matchedRowData.push(row);
								}
							});
						});
						lastFilteredKey = key;
						break;
					}
				}
			}

			let keys = Object.keys(state.filterModel);
			let nextCategory = keys[keys.indexOf(lastFilteredKey) + 1];

			let firstFilteredData = [];
			if (nextCategory !== undefined && state.filterModel[nextCategory].length > 0) {
				matchedRowData.forEach((el) => {
					state.filterModel[nextCategory].forEach((value) => {
						if (el[nextCategory] == value) {
							firstFilteredData.push(el);
						}
					});
				});
			} else {
				firstFilteredData = matchedRowData;
			}
			lastFilteredKey = nextCategory;

			let secondFilteredData = [];
			nextCategory = keys[keys.indexOf(lastFilteredKey) + 1];

			if (nextCategory !== undefined && state.filterModel[nextCategory].length > 0) {
				firstFilteredData.forEach((el) => {
					state.filterModel[nextCategory].forEach((value) => {
						if (el[nextCategory] == value) {
							secondFilteredData.push(el);
						}
					});
				});
			} else {
				secondFilteredData = firstFilteredData;
			}
			lastFilteredKey = nextCategory;

			let thirdFilteredData = [];
			nextCategory = keys[keys.indexOf(lastFilteredKey) + 1];

			if (nextCategory !== undefined && state.filterModel[nextCategory].length > 0) {
				firstFilteredData.forEach((el) => {
					state.filterModel[nextCategory].forEach((value) => {
						if (el[nextCategory] == value) {
							thirdFilteredData.push(el);
						}
					});
				});
			} else {
				thirdFilteredData = secondFilteredData;
			}

			for (let i = 0; i < thirdFilteredData.length; i += state.rowsPerSlide) {
				const chunk = thirdFilteredData.slice(i, i + state.rowsPerSlide);
				state.preparedSlides.push(chunk);
			}
		},
		clearFilterModel(state) {
			state.filterModel = {
				job: [],
				city: [],
			};
		},
		hideRow(state, id) {
			let removedRow = state.rowsData.splice(
				state.rowsData.findIndex((row) => {
					return row.id == id;
				}),
				1
			);
			state.rowsDataHidden.push(removedRow[0]);
		},
		returnRow(state, id) {
			let removedRow = state.rowsData.splice(
				state.rowsData.findIndex((row) => {
					return row.id == id;
				}),
				1
			);
			state.rowsDataHidden.push(removedRow[0]);
		},
		switchRowData(state) {
			// меняем местами текущие данные
			let tempData = state.rowsDataHidden;
			state.rowsDataHidden = state.rowsData;
			state.rowsData = tempData;

			// меняем местами сохраненные данные до поиска
			tempData = state.preSearchedHiddenRowsData;
			state.preSearchedHiddenRowsData = state.preSearchedRowsData;
			state.preSearchedRowsData = tempData;

			// true/false состояние для кнопки скрыть/вернуть
			state.hideHiddenData = !state.hideHiddenData;
		},
		saveRowsData(state) {
			state.savedRowsData = state.rowsData;
		},
		searchInputFilter(state) {
			if (state.currentSearchCounter == 0) {
				// если counter 0, то есть поиск происходит первый раз, то сохраняем даныне
				state.preSearchedRowsData = state.rowsData;
				state.preSearchedHiddenRowsData = state.rowsDataHidden;
			} else {
				// если counter НЕ 0, то перезаписываем сохраненные данные в исходные переменные
				state.rowsData = state.preSearchedRowsData;
				state.rowsDataHidden = state.preSearchedHiddenRowsData;
			}
			if (state.searchPhrase.length > 0) {
				const searchFilteredRowsData = state.rowsData.filter((row) => {
					for (const key in row) {
						if (Object.hasOwnProperty.call(row, key)) {
							if (state.searchableKeys.includes(key)) {
								const element = row[key];
								if (element !== null) {
									if (element.includes(state.searchPhrase)) {
										return row;
									}
								}
							}
						}
					}
				});
				state.rowsData = searchFilteredRowsData;
				state.currentSearchCounter++;
			} else {
				state.currentSearchCounter = 0;
			}
		},
		setRowsData(state, phpRowsData) {
			state.rowsData = phpRowsData;
		},
		updateDataFlag(state) {
			state.isRowsDataReady = true;
		},
	},
	actions: {
		async getRowsData({ state, commit }) {
			const token = document.getElementById("token").getAttribute("value");
			if (token) {
				state.isDataLoading = true;
				await axios
					.get(`https://b24-ost.ru/hr_integration_opti/vacan/vacancies.php/?token=${token}`)
					.then((r) => r.data)
					.then((rowsData) => {
						commit("setRowsData", rowsData);
						commit("makePreparedSlides", state.rowsData);
						commit("updateDataFlag");
					})
					.finally(() => {
						state.isDataLoading = false;
					});
			} else {
				state.loaderText =
					"Авторизационный токен не получен, заново нажмите на ссылку <<Список вакансий HH>> в боковом меню.";
				state.errorHappened = true;
			}
		},
	},
	modules: {},
});
