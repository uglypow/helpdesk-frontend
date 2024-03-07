import moment from "moment-timezone";

export const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY')
}

export const formatTime = (date) => {
    return moment(date).format('HH:mm')
}

export const formatDateTime = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm')
}

export const isToday = (date) => {
    return moment(date).isSame(new Date(), 'day')
}


