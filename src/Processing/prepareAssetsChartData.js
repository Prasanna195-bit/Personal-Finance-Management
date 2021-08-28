export default function prepareAssetsChartData(givenData, givenLabel) {
    let clabels = [];
    let cvalues = [];

    // Splitting the asset names & values
    givenData.forEach(asset => {
        clabels.push(asset.assetName);
        cvalues.push(asset.amount);
    });

    let colors = [
        'rgba(63, 68, 136, 1.0)',
        'rgba(173, 82, 26, 1.0)',
        'rgba(0, 199, 150, 1.0)',
        'rgba(0, 174, 199, 1.0)',
        'rgba(216, 169, 235, 1.0)',
        'rgba(190, 221, 183, 1.0)',
        'rgba(255, 149, 157, 1.0)',
        'rgba(243, 238, 238, 1.0)'
    ]

    // creating the chartData
    let temp_chartData = {
        labels: clabels,
        datasets: [{
            label: givenLabel,
            data: cvalues,
            backgroundColor: colors
        }]
    }

    return temp_chartData;
}