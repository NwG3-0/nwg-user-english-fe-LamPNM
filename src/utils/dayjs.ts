import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import updateLocale from 'dayjs/plugin/updateLocale'
import duration from 'dayjs/plugin/duration'

dayjs.extend(utc)
dayjs.extend(updateLocale)
dayjs.extend(duration)

dayjs.updateLocale('en', {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
})

const extendedDayJs = dayjs

export default extendedDayJs
