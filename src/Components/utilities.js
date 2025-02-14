const limitString = (str, limit) => {
  let stringLimit = ''; let i = 0
  str = str.split(' ')
  str.forEach(element => {
    if (i < limit) {
      if (Math.ceil(element.length / 2) + i > limit) {
        return stringLimit
      }
      i += element.length + 1
      stringLimit = stringLimit + ' ' + element
    }
  })

  return stringLimit.slice(1)
}
export { limitString }
