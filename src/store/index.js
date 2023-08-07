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
		rowsData: [],
		rowsDataHidden: [],
		savedRowsData: [],
		hideHiddenData: true,
		searchableKeys: ["name", "phone", "job", "city"],
		preSearchedRowsData: [],
		preSearchedHiddenRowsData: [],
		currentSearchCounter: 0,
		rowsDataUpdated: false,
		isDataLoading: true,
		showTimeTitle: true,
		loaderText: "Данные загружаются...",
		showErrorFilesList: false,
		errorFilesList: [],
		errorPaths: {
			"https://b24-ost.ru/hr_integration_opti/resume.php": "Список резюме из избранного",
		},
		token: "",
		showSpinner: true,
		showErrorIcon: false,
		showMessage: false,
		loaderReplies: [],
		axiosCounter: 0,
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
		addRowsData(state, responseData) {
			state.rowsData = [...state.rowsData, ...responseData];
		},
		newDataAccepted(state) {
			state.rowsDataUpdated = true;
		},
		hideLoader(state) {
			state.isDataLoading = false;
		},
		showLoaderError(state) {
			state.loaderText = "Не удалось загрузить некоторые данные";
			state.showErrorFilesList = true;
			state.showErrorIcon = true;
			state.showSpinner = false;
			state.showTimeTitle = false;
		},
		showMessage(state, message) {
			state.isDataLoading = true;
			state.showMessage = true;
			state.loaderText = message;
			state.showTimeTitle = false;
			state.showErrorFilesList = false;
			state.showErrorIcon = false;
		},
		addLoaderReply(state, reply) {
			state.loaderReplies.push(reply);
		},
		removeReply(state, idx) {
			state.loaderReplies.splice(idx, 1);
		},
		resetRowsDataUpdated(state) {
			state.rowsDataUpdated = false;
		},
		clearRowsData(state) {
			state.rowsData = [];
		},
	},
	actions: {
		async getRowsData({ state, commit }) {
			const tokenInput = document.getElementById("token");
			if (tokenInput) {
				const token = tokenInput.getAttribute("value");
				if (token) {
					state.token = token;
					state.isDataLoading = true;
					document.title = "Загрузка данных...";
					Promise.all([
						axios
							.get(`https://b24-ost.ru/hr_integration_opti/resume.php?token=${token}&return_error=true`)
							.catch((e) => {
								let url = new URL(e.config.url);
								let noSearchParamsURL = url.origin + url.pathname;
								state.errorFilesList.push(noSearchParamsURL);
							}),
					])
						.then(
							axios.spread((response1) => {
								commit("clearRowsData");
								const allResponses = [response1];
								allResponses.forEach((response) => {
									if (response?.status == 200) {
										commit("addRowsData", response.data);
									}
								});
							})
						)
						.finally(() => {
							if (state.errorFilesList.length == 0) {
								commit("hideLoader");
								document.title = "Список резюме HH";
							} else {
								commit("showLoaderError");
							}
							commit("newDataAccepted");
						});
				} else {
					state.loaderText = `Сеанс устарел, заново перейдите по ссылке "Список резюме HH" в боковом меню.`;
					state.showTimeTitle = false;
					state.showSpinner = false;
					state.showErrorIcon = true;
				}
			} else {
				state.loaderText = `Сеанс устарел, заново перейдите по ссылке "Список резюме HH" в боковом меню.`;
				state.showTimeTitle = false;
				state.showSpinner = false;
				state.showErrorIcon = true;
			}
		},
		async reloadErrorFile({ state, commit }, path) {
			axios
				.get(path + `?token=${state.token}`)
				.then((response) => {
					let url = new URL(response.config.url);
					let noSearchParamsURL = url.origin + url.pathname;
					commit("addRowsData", response.data);
					commit("addLoaderReply", {
						file: state.errorPaths[noSearchParamsURL],
						message: "Данные успешно загружены",
					});
					commit("newDataAccepted");
				})
				.catch((e) => {
					let url = new URL(e.config.url);
					let noSearchParamsURL = url.origin + url.pathname;
					commit("addLoaderReply", {
						file: state.errorPaths[noSearchParamsURL],
						message: "Превышено время загрузки, повторите попытку через некоторое время",
					});
				});
		},
	},
	modules: {},
});
