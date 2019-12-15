export const getKeyByValue = (object, value) => {
    if (value) {
        return Object.keys(object).find(key => object[key] === value);
    } else {
        return '';
    }
};
