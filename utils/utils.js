const template = (status, params) => {
    return {
        status,
        message: params
    }
}

module.exports = template;