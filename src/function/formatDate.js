
function formatDate(date, format) {
    const map = {
        dd: ("0" + date.getDate()).slice(-2),
        MM: ("0" + (date.getMonth() + 1)).slice(-2),
        yy: date.getFullYear().toString().slice(-2),
        MMM: date.toLocaleString('en-us',{month:'short'}),
        MMMM: date.toLocaleString('en-us',{month:'long'}),
        yyyy: date.getFullYear(),
        HH: ("0" + date.getHours()).slice(-2),
        mm: ("0" + date.getMinutes()).slice(-2),
        ss: ("0" + date.getSeconds()).slice(-2)
    }

    return format.replace(/dd|MMMM|MMM|MM|yyyy|yy|HH|mm|ss/gi, matched => map[matched])
}

module.exports = formatDate