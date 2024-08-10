exports.handleValidation = (error, modelName) => {
    const errors = {
        message: {},
        status: 500
    };

    if (error.code === 11000) {
        Object.keys(error.keyValue).forEach(elem => errors['message'][elem] = `This ${elem} is taken`);
        errors.status = 409;
        return errors;
    }

    if (error.message.includes(`${modelName} validation failed`)) {
        Object.values(error.errors).map(({properties}) => errors.message[properties.path] = properties.message);
        errors.status = 422;
        return errors;
    }

    return errors;
}