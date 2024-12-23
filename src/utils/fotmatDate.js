export const formatDate = (dateString, formatType = 'numeric', language = 'ru') => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const locales = {
        ru: {
            months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        },
        ua: {
            months: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
            days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'],
        },
        en: {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
    };
    const { months, days } = locales[language];
    let month;
    let formattedDate;
    if (formatType === 'shortMonth') {
        month = months[date.getMonth()];
        formattedDate = `${day} / ${month} / ${year}`;
    }
    else if (formatType === 'dayAndMonth') {
        const dayOfWeek = days[date.getDay()];
        month = months[date.getMonth()];
        formattedDate = `${dayOfWeek}, ${day} ${month}, ${year}`;
    }
    else if (formatType === 'dayAndMonthOnly') {
        month = String(date.getMonth() + 1).padStart(2, '0');
        formattedDate = `${month} / ${day}`;
    }
    else {
        month = String(date.getMonth() + 1).padStart(2, '0');
        formattedDate = `${day} / ${month} / ${year}`;
    }
    return formattedDate;
};
export const currentDate = (language = 'en') => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear(); // Год
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const locales = {
        ru: { format: 'dd.MM.yyyy' },
        ua: { format: 'dd.MM.yyyy' },
        en: { format: 'MM/dd/yyyy' },
    };
    const { format } = locales[language];
    const currentData = `${year}-${month}-${day}`;
    const currentTime = `${hours}:${minutes}`;
    return { currentData, currentTime, format };
};
