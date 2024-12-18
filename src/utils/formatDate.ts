export const formatDateToYMD = (date: string | number) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear().toString().slice(2)
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')

  return `${year}. ${month}. ${day}`
}

export const formatDateToMDY = (date: string | number) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()

  return `${month}월 ${day}일, ${year}`
}

export const formatDateToHM = (date: string | number) => {
  const newDate = new Date(date)
  const hour = newDate.getHours().toString().padStart(2, '0')
  const minute = newDate.getMinutes().toString().padStart(2, '0')

  return `${hour}:${minute}`
}

export const formatDateElapsed = (time: string | number) => {
  const currentDateTime = Date.now() / (1000 * 60 * 60 * 24)
  const currentHourTime = Date.now() / (1000 * 60 * 60)
  const currentMinuteTime = Date.now() / (1000 * 60)
  const dateTime = new Date(time).getTime() / (1000 * 60 * 60 * 24)
  const hourTime = new Date(time).getTime() / (1000 * 60 * 60)
  const minuteTime = new Date(time).getTime() / (1000 * 60)
  let diffTime = currentDateTime - dateTime

  if (diffTime >= 365) {
    return `${Math.floor(diffTime / 365)} 년 전`
  }
  if (diffTime > 31) {
    return `${Math.floor(diffTime / 30)} 달 전`
  }
  if (diffTime >= 1) {
    return `${Math.floor(diffTime)}일 전`
  }
  if (diffTime > 0.01) {
    diffTime = currentHourTime - hourTime
    return `약 ${Math.floor(diffTime <= 1 ? 1 : diffTime)} 시간 전`
  }
  if (diffTime > 0) {
    diffTime = currentMinuteTime - minuteTime
    return `약 ${Math.floor(diffTime <= 1 ? 1 : diffTime)} 분 전`
  }
  return `방금 전`
}

export const getSignUpDays = (date: string) => {
  const targetTime = new Date(date)
  const currentTime = new Date()
  const diffTime = Number(currentTime) - Number(targetTime)
  const result = Math.floor(diffTime / 86400000)

  if (result < 1) {
    return '1'
  }

  return result
}

/**
 * 인자로 주어진 년의 1월 1일의 요일을 구하는 함수
 */
export const getFirstDayInYear = (year: number) => {
  return new Date(year, 0, 1).getDay()
}

/**
 * 인자로 받는 년의 각 달의 일수를 구하는 함수
 */
export const getDaysInYear = (year: number) => {
  const daysInYear = []
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    daysInYear.push(daysInMonth)
  }
  return daysInYear
}
