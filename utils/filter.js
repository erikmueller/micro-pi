export function lastDay(data) {
    return data
        .filter(record => new Date(record.date).toDateString() === new Date().toDateString())
        .map(record => {
            const date = new Date(record.date)

            return {
                date: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
                // TODO Wait for object spread -.-
                temp: record.temp,
                humidity: record.humidity
            }
        })
}
