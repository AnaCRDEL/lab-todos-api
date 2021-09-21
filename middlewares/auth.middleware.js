const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
    const token = request.get('Authorization');
    if(!token) {
        response.status(401).json({message: 'Resquest without token'})
    };
    const tokenWithoutBearer = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(
            tokenWithoutBearer,
            process.env.SECRET_JWT
        )
        request.user = { ...decodedToken };
        next();
    } catch (error) {
        response.status(401).json({message: 'Unauthorized'})
    }
}

module.exports = auth;