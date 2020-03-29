const template = (status, params) => {
    return {
        status,
        data: params
    }
}

module.exports = template;