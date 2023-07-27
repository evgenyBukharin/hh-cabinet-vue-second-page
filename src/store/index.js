import { createStore } from "vuex";

export default createStore({
	state: {
		rowsPerSlide: 5,
		preparedSlides: [],
		hiddenPreparedSlides: [],
		pageCountOptions: [5, 10, 15],
		searchPhrase: "",
		filterModel: {
			vacancy: [],
			job: [],
			city: [],
			replyStatus: [],
		},
		selectedStatus: "",
		categotyFilterList: [
			{
				en: "vacancy",
				ru: "Вакансия",
			},
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
				vacancy: "Врач-невролог 123",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Подумать",
			},
			{
				id: 1,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Уборщик",
				vacancy: "Врач-невролог 232",
				salary: "60 000",
				city: "Екатеринбург",
				hhLink: "https://google.com",
				replyStatus: "Посмотревшие вакансию",
			},
			{
				id: 2,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Глав врач",
				vacancy: "Врач-невролог 2",
				salary: "60 000",
				city: "Алматы",
				hhLink: "https://google.com",
				replyStatus: "Посмотревшие вакансию",
			},
			{
				id: 3,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Педиатор",
				vacancy: "Врач-невролог 2",
				salary: "60 000",
				city: "Екатеринбург",
				hhLink: "https://google.com",
				replyStatus: "Посмотревшие вакансию",
			},
			{
				id: 4,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Дантист",
				vacancy: "Врач-невролог 2",
				salary: "60 000",
				city: "Москва",
				hhLink: "https://google.com",
				replyStatus: "Подходящие отклики",
			},
			{
				id: 5,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Уборщик",
				vacancy: "Врач-невролог 2",
				salary: "60 000",
				city: "Екатеринбург",
				hhLink: "https://google.com",
				replyStatus: "Подумать",
			},
			{
				id: 6,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Уборщик",
				vacancy: "Врач-невролог 3",
				salary: "60 000",
				city: "Алматы",
				hhLink: "https://google.com",
				replyStatus: "Подходящие отклики",
			},
			{
				id: 7,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Педиатор",
				vacancy: "Врач-невролог 2",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Звонки",
			},
			{
				id: 8,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				vacancy: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Подходящие отклики",
			},
			{
				id: 9,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				vacancy: "Врач-невролог",
				salary: "60 000",
				city: "Алматы",
				hhLink: "https://google.com",
				replyStatus: "Подумать",
			},
			{
				id: 10,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				vacancy: "Врач-невролог",
				salary: "60 000",
				city: "Алматы",
				hhLink: "https://google.com",
				replyStatus: "Подходящие отклики",
			},
			{
				id: 11,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				vacancy: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Звонки",
			},
			{
				id: 12,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				vacancy: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Подумать",
			},
			{
				id: 13,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				vacancy: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Телефонное интервью",
			},
			{
				id: 14,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				vacancy: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Оценка",
			},
			{
				id: 15,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Врач-невролог",
				vacancy: "Врач-невролог",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Интервью",
			},
			{
				id: 16,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Уборщик",
				vacancy: "Врач-невролог 3",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Предложение о работе",
			},
			{
				id: 17,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Фронтендер",
				vacancy: "Врач-невролог 3",
				salary: "60 000",
				city: "Челябинск",
				hhLink: "https://google.com",
				replyStatus: "Выход на работу",
			},
			{
				id: 18,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Педиатор",
				vacancy: "Врач-невролог 3",
				salary: "60 000",
				city: "Москва",
				hhLink: "https://google.com",
				replyStatus: "Отказ",
			},
			{
				id: 19,
				name: "Иванов Евгений Иванович",
				phone: "+7 (908) 078 87 23",
				job: "Педиатор",
				vacancy: "Врач-невролог 3",
				salary: "60 000",
				city: "Нью-Йорк",
				hhLink: "https://google.com",
				replyStatus: "Посмотревшие вакансию",
			},
		],
		rowsDataHidden: [],
		savedRowsData: [],
		statusesList: [
			"Все неразобранные",
			"Подходящие отклики",
			"Звонки",
			"Подумать",
			"Телефонное интервью",
			"Оценка",
			"Интервью",
			"Предложение о работе",
			"Выход на работу",
			"Отказ",
			"Посмотревшие вакансию",
		],
		hideHiddenData: true,
		searchableKeys: ["name", "phone", "job", "vacancy", "city"],
		preSearchedRowsData: [],
		preSearchedHiddenRowsData: [],
		currentSearchCounter: 0,
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
				vacancy: [],
				job: [],
				city: [],
				replyStatus: [],
			};
		},
		clearFilterModelStatus(state) {
			state.filterModel.replyStatus = [];
		},
		setNewStatus(state, status) {
			status !== undefined ? (state.selectedStatus = status) : (state.selectedStatus = "Все неразобранные");
		},
		setNewFilterStatus(state, status) {
			state.filterModel.replyStatus[0] = status;
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
								if (element.includes(state.searchPhrase)) {
									return row;
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
	},
	actions: {},
	modules: {},
});
