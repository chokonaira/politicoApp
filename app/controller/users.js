import passwordHash from 'password-hash';
import db from '../models/db'
import AuthHelper from '../helper/auth'

const { generateToken } = AuthHelper

const userController = {
    async signup(req, res) {
        const { firstName, lastName, otherName, phoneNumber, email, password, passportUrl, isAdmin } = req.body;
        const hashedpassword = passwordHash.generate(password);
        const dbClient = await db.connect()
        try {
            const text = 'INSERT INTO users (firstName, lastName, otherName, phoneNumber, email, password, passportUrl, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * '
            const values = [firstName, lastName, otherName, phoneNumber, email, hashedpassword, passportUrl, isAdmin]
            let user = await dbClient.query({ text, values })
            if (user.rowCount) {
                user = user.rows[0]
                const { id, isadmin } = user;
                const token = await generateToken({ id, isadmin });
                return res.status(201).json({
                    status: 201,
                    data: [{ token, user }],
                });
            }
        } catch (e) {
            const { constraint } = e;
            if (constraint === 'users_email_key') {
                return res.status(409).json({ status: 409, message: 'User already exists' });
            }
            throw e
            return res.status(500).json({ error: true, message: 'Internal Server error' });
        } finally {
            dbClient.release()
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        const dbClient = await db.connect()
        try {
            const text = 'SELECT * FROM users WHERE email = $1'
            const values = [email]
            let user = await dbClient.query({ text, values })
            if (user.rowCount) {
                user = user.rows[0]
                if (passwordHash.verify(password, user.password)) {
                    const { id, isadmin } = user;
                    const token = await generateToken({ id, isadmin });
                    return res.status(200).json({ data: [{ token, user }], message: 'Login successful' });
                }
                return res.status(401).json({ status: 401, message: 'Invalid credentails' });
            }
            return res.status(401).json({ status: 401, message: 'Invalid credentails' });
        } catch (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        } finally {
            dbClient.release();
        }
    }
};

export default userController;
