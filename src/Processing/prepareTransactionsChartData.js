export default function prepareTransactionsChartData(givenData, givenLabel) {
    let clabels = [];
    let cvalues = [];
    let creditTotal = 0;
    let debitTotal = 0;

    // Calculating the total credit and debit
    givenData.forEach(transaction => {
        if (transaction.transactionType === 'Credit') {
            creditTotal += transaction.amount;
        }
        else {
            debitTotal += transaction.amount;
        }
    });

    clabels = ['Credit', 'Debit'];
    cvalues = [creditTotal, debitTotal];

    let colors = [
        'rgba(10, 186, 181, 1.0)',
        'rgba(245, 69, 74, 1.0)'
    ];

    let chartData = {
        labels: clabels,
        datasets: [{
            label: givenLabel,
            data: cvalues,
            backgroundColor: colors
        }],
    };

    return chartData;
}