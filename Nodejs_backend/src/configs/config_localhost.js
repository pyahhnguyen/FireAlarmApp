const localhost = {
    local : {
        host: 'localhost',
        port: process.env.PORT,
    },
    
    ip_host: {
        host: process.env.IP_HOST,
        port: process.env.PORT,
    }

}

module.exports = localhost;