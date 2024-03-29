export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidaty = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}