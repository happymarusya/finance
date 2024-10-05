export class ShowOperationsUtils {
    static showRecords(operations) {
        const recordsElement = document.getElementById('records');
        recordsElement.innerHTML = '';

        for (let i = 0; i < operations.length; i++) {
            const data = operations[i].date;
            const splitData = data.split("-")
            operations[i].date = splitData[2] + '.' + splitData[1] + '.' + splitData[0];

            if (operations[i].type === 'income') {
                operations[i].type = 'доход';
            } else {
                operations[i].type = 'расход';
            }

            const trElement = document.createElement('tr')

            trElement.insertCell().innerHTML = '<div class="number">' + (i + 1) + '</div>';
            trElement.insertCell().innerHTML = operations[i].type === 'доход' ? ('<div class="text-success">' + operations[i].type + '</div>') : ('<div class="text-danger">' + operations[i].type + '</div>');
            trElement.insertCell().innerText = operations[i].category;

            trElement.insertCell().innerText = operations[i].amount + '$';
            trElement.insertCell().innerText = operations[i].date;
            trElement.insertCell().innerText = operations[i].comment;

            trElement.insertCell().innerHTML =
                '<a href="/income-expense/delete?id=' + operations[i].id + '"><img src="/images/trash.png" alt="trash" class="me-2" data-bs-target="#deleteIncomeExpense" data-bs-toggle="modal"></a>' +
                '<a href="/income-expense/edit?id=' + operations[i].id + '"><img src="/images/edit.png" alt="edit"></a>';

            recordsElement.appendChild(trElement);
        }
    }
}