export default (...args) => {
  process.env.DEBUG === 'TRUE' && console.log(...args);
};
