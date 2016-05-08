
export function rawToArray(rawData) {
    return rawData.split('\n')
        // omit eof newline
        .filter((line => Boolean(line)))
        .map(line => {
            const [, date, temp, humidity] = line.match(/(.*)Temp=(\d+).*Humidity=(\d+)/)

            return {date: new Date(date).toLocaleString(), temp, humidity}
        })
}
export function toChartData(data) {
    return {
        labels: data.map(record => record.date),
        datasets: [{
            lineTension: 0,
            fill: false,
            yAxisID: 'temp',
            label: 'Temperatur',
            borderColor: 'rgb(192,75,75)',
            backgroundColor: 'rgba(192,75,75,0.4)',
            data: data.map(record => record.temp)
        }, {
            yAxisID: 'hum',
            label: 'Luftfeuchtigkeit',
            borderColor: 'rgb(75,192,192)',
            backgroundColor: 'rgba(75,192,192,0.4)',
            data: data.map(record => record.humidity)
        }]
    }
}
