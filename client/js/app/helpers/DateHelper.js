class DateHelper {
    constructor () {
        throw new Error('DateHelper can not be instantiated !!!')
    }
    static date2Text (d) {
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    static text2Date(text) {
        if(!/^\d{4}-\d{2}-\d{2}$/.test(text))
            throw new Error('Date Format invalid - Use YYYY-MM-DD');
        return new Date(...text.split('-').map((v, i) =>  v - i%2))
    }
}