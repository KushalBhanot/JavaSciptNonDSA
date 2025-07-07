export default function debounce(func, wait) {
  let timeoutID = null;

  return function(...args) {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      timeoutID = null;
      func.apply(this, args);
    }, wait);
  };
}
