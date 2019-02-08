import jwt from 'jsonwebtoken'
const HASH = process.env.HASH

const authHelpers = {
    generateToken(payload) {
        return jwt.sign(payload, HASH, { expiresIn: '24h' });
    },

    verifyToken(token) {
        return jwt.verify(token, HASH);
    }
}

export default authHelpers