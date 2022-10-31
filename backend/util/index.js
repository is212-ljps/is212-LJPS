const checkLength = (min, max, item) => {
  try {
    return item.length > max || item.length < min;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deepEqual = (a, b) => {
  if (JSON.stringify(a) == JSON.stringify(b)) {
    return true;
  }
  return false;
};

module.exports = { checkLength, deepEqual };
