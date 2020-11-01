const validateParams = (obj, keys) => {
    let isValid = true;
    keys.forEach(key => {
        if (!obj[key]) {
            isValid = false;
        }
    });
    return isValid;
};

module.exports = validateParams;