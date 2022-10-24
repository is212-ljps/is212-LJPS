const checkLength = (min, max, item) => {
  try {
    return (item.length > max || item.length < min)
  }
  catch (err) {
    console.log(err)
    return false
  }
}


module.exports = { checkLength }