export const wait = (time: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}
