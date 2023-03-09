//djamaatul

//get name of day specific month year
const getNameOfDay = (...props) => new Date(...props).toLocaleString('en-us', { weekday: 'long' })

const getNameOfMonth = (e) => new Date(0, e, 1).toLocaleString('en-us', { month: 'long' })

//get total day of specific year
const getTotalDayOfYear = (...props) => new Date(...props).getDate()

//names of month
const month = [...Array(12)].map((e, i) => getNameOfMonth(i))

function getDaysOfMonth(year) {
	//generate day of month specific year
	let daysOfYear = month.map((monthName, indexMonth) => {
		const nDay = getTotalDayOfYear(year, indexMonth + 1, 0)
		//loop day for get name,date,month
		return [...Array(nDay)].map((e, indexDay) => {
			const dayName = getNameOfDay(year, indexMonth, indexDay + 1)
			return ({
				date: indexDay + 1,
				month: indexMonth + 1,
				year,
				dayName,
				monthName
			})
		})
	}).flat(2) // merged all days
	//loop month for spliting days per month
	return month.map((e, month) => {
		//dates per month
		const dates = daysOfYear.filter(e => e.month === month + 1)
		//get offset day per month
		const offset = new Date(year, month, 1).getDay()
		//loop total offset for insert date,month,dayname
		const offsetInitialDay = [...Array(offset)].map((e, day) => {
			const dateInitialDate = getTotalDayOfYear(year, month, 0)
			const dayName = getNameOfDay(year, month - 1, dateInitialDate - (offset - (day + 1)))
			const monthCode = month === 0 ? 12 - month : month
			return {
				date: dateInitialDate - (offset - (day + 1)),
				month: monthCode,
				year: month === 0 ? year - 1 : year,
				dayName,
				monthName: getNameOfMonth(monthCode - 1)
			}
		})
		//merge initial date
		let daysOfMonth = [...offsetInitialDay, ...dates]
		//loop total day Left for insert date,month,dayname
		const dayLeft = [...Array((daysOfMonth.length > 35 ? 42 : 35) - daysOfMonth.length)].map((e, day) => {
			const dayName = getNameOfDay(year, month + 1, day + 1)
			const monthCode = month === 11 ? 1 : month + 2
			return {
				date: day + 1,
				month: monthCode,
				year: month === 11 ? year + 1 : year,
				dayName,
				monthName: getNameOfMonth(monthCode - 1)
			}
		})
		//merged day left
		return [...daysOfMonth, ...dayLeft]
	})
}
//test
console.log(getDaysOfMonth(2023))