import Chart from 'chart.js/auto';

export class Main {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        console.log('Главная');
        this.init();
    }

    init() {
        let xValues = ["Red", "Orange", "Yellow", "Green", "Blue"];
        let yValuesIncome = [15, 89, 24, 44, 15];
        let yValuesExpense = [55, 49, 44, 24, 15];
        let barColors = [
            "#DC3545",
            "#FD7E14",
            "#FFC107",
            "#20C997",
            "#0D6EFD"
        ];

        new Chart("chartIncome", {
            type: "pie",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValuesIncome
                }]
            },
            options: {
                title: {
                    display: true,
                    text: ""
                }
            }
        });

        new Chart("chartExpense", {
            type: "pie",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValuesExpense
                }]
            },
            options: {
                title: {
                    display: true,
                    text: ""
                }
            }
        });
    }
}