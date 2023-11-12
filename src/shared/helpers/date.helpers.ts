import * as moment from 'moment'

export const dateToSqlFormat = data => moment(data).format('YYYY-MM-DD')
