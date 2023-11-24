function getAllBarChartData() {
    let tbody = document.querySelector('tbody');

    axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res => {
        let i = 0;
        let incomes = [];
        let expenses = [];

        res.data.sort((a, b) => a.date.localeCompare(b.date));
        res.data.forEach(item => {
            i++;

            if (item.type == 1) {
                expenses.push({ date: item.date.split('T')[0], amount: -item.amount });
            } else {
                incomes.push({ date: item.date.split('T')[0], amount: item.amount });
            }
        });

        renderChart(incomes, expenses);
    });
}
function renderChart(incomes, expenses) {
    let dates = Array.from(new Set([...incomes.map(i => i.date), ...expenses.map(e => e.date)]));
    dates.sort();

    let incomeData = dates.map(date => incomes.filter(i => i.date === date).reduce((total, i) => total + i.amount, 0));
    let expenseData = dates.map(date => expenses.filter(e => e.date === date).reduce((total, e) => total + e.amount, 0));

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Bevételek',
                    data: incomeData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Kiadások',
                    data: expenseData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderBarChart() {
    setTimeout(() => { getAllBarChartData(); }, 200);
}