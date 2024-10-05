import {HttpUtils} from "../utils/http-utils";
import {ShowOperationsUtils} from "../utils/show-operations-utils";
import {ButtonsActiveUtils} from "../utils/buttons-active-utils";

export class OperationsFilters {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.btnToday = document.getElementById('btn-today');
        this.btnToday.addEventListener('click', this.showOperationsToday.bind(this));
        this.btnWeek = document.getElementById('btn-week');
        this.btnWeek.addEventListener('click', this.showOperationsWeek.bind(this));
        this.btnMonth = document.getElementById('btn-month');
        this.btnMonth.addEventListener('click', this.showOperationsMonth.bind(this));
        this.btnYear = document.getElementById('btn-year');
        this.btnYear.addEventListener('click', this.showOperationsYear.bind(this));
        this.btnAll = document.getElementById('btn-all');
        this.btnAll.addEventListener('click', this.showOperationsAll.bind(this));
        this.btnInterval = document.getElementById('btn-interval');
        this.btnInterval.addEventListener('click', this.showOperationsInterval.bind(this));
        this.btnFrom = document.getElementById('btn-date-from');
        this.btnFrom.addEventListener('click', this.chooseDateFrom.bind(this));
        this.btnTill = document.getElementById('btn-date-till');
        this.btnTill.addEventListener('click', this.chooseDateTill.bind(this));
        this.buttons = document.querySelectorAll('.btn-outline-secondary');
        this.dateFromInputElement = document.getElementById('date-from');
        this.dateTillInputElement = document.getElementById('date-till');
    }

    async showOperationsToday() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnToday.classList.add('active');
        const result = await HttpUtils.request('/operations?period=today');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за сегодня. Обращайтесь в поддержку')
        }
        ShowOperationsUtils.showRecords(result.response);
    }

    async showOperationsWeek() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnWeek.classList.add('active');
        const result = await HttpUtils.request('/operations?period=week');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за неделю. Обращайтесь в поддержку')
        }
        ShowOperationsUtils.showRecords(result.response);
    }

    async showOperationsMonth() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnMonth.classList.add('active');
        const result = await HttpUtils.request('/operations?period=month');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за месяц. Обращайтесь в поддержку')
        }
        ShowOperationsUtils.showRecords(result.response);
    }

    async showOperationsYear() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnYear.classList.add('active');
        const result = await HttpUtils.request('/operations?period=year');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за год. Обращайтесь в поддержку')
        }
        ShowOperationsUtils.showRecords(result.response);
    }

    async showOperationsAll() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnAll.classList.add('active');
        const result = await HttpUtils.request('/operations?period=all');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за весь период. Обращайтесь в поддержку')
        }
        ShowOperationsUtils.showRecords(result.response);
    }

    chooseDateFrom() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.dateFrom = this.dateFromInputElement.value;
    }

    chooseDateTill() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.dateTill = this.dateTillInputElement.value;
    }

    async showOperationsInterval() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnInterval.classList.add('active');
        if (this.dateFrom && this.dateTill) {
            const result = await HttpUtils.request('/operations?period=interval&dateFrom=' + this.dateFrom + '&dateTo=' + this.dateTill)
            // console.log(result);
            if (result.error || !result.response || (result.response && result.response.error)) {
                return alert('Возникла ошибка при добавлении операции расходов. Обратитесь в поддержку');
            }
            ShowOperationsUtils.showRecords(result.response);
        }
    }
}

