export const formatTime = function (date, format) {
    if (format === 'yyyy-MM-dd') {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        month = month >= 10 ? month : '0' + month
        let day = date.getDate()
        day = day >= 10 ? day : '0' + day
        return `${year}-${month}-${day}`
    }
    return ''
}
