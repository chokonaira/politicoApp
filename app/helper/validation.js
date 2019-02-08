const validationHelpers = {
    getErrors(errors) {
        const validationErrors = [];
        errors.map(error => validationErrors.push(error.msg));
        return validationErrors;
    }
}

export default validationHelpers