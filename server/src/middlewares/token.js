const jwt = require('jsonwebtoken')

const generateToken = (id,role) =>{
    return jwt.sign({id,role},process.env.SecretToken,{
        expiresIn:'7days'
    })
}

module.exports = generateToken;