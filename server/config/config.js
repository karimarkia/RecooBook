const config = {
    production : {
        SECRET : process.env.SECRET,
        DATABASE : process.env.MONGODB_URI
    },
    default: {
        SECRET : 'SECRETPASSWORD',
        DATABASE :   'mongodb+srv://karim123:karim123@cluster0.qmhox.mongodb.net/recobooks?retryWrites=true&w=majority'

    }
}

exports.get = function get(env) {
    return config[env] || config.default
} 