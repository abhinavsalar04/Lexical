
const debounce = (fn, delay) => {
    let timeoutID;
    return function (...args) {
        clearTimeout(timeoutID);
        timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
    };
};

export default debounce;
