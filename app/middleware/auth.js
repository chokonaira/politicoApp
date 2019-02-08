import db from '../models/db'
import validationHelper from '../helper/validation'
import authHelper from '../helper/auth'

const { verifyToken } = authHelper
const { getErrors } = validationHelper

const candidateMiddleware = {
    signupValidation(req, res, next) {
        req.check('firstName', 'First Name is required').notEmpty();
        req.check('lastName', 'Last Name is required').notEmpty().trim()
          .isString()
          .withMessage('Last Name must be a string');
        req.check('phoneNumber', 'The phone number is required').notEmpty().trim().isString();
        req.check('password', 'Password is required')
          .notEmpty().trim().isLength({ min: 6 })
          .withMessage('password cannot be less then 6 characters');
        req.check('email', 'Email is required').notEmpty().isEmail()
          .withMessage('Invalid email');
        const errors = req.validationErrors();
    
        if (errors) {
          return res.status(400).json({
            status: 400,
            error: getErrors(errors),
          });
        }
    
        return next();
      },

      loginValidation(req, res, next) {
        req.check('password', 'Password is required')
          .notEmpty().trim().isLength({ min: 6 })
          .withMessage('password cannot be less then 6 characters');
        req.check('email', 'Email is required').notEmpty().isEmail()
          .withMessage('Invalid email');
        const errors = req.validationErrors();
    
        if (errors) {
          return res.status(400).json({
            status: 400,
            error: getErrors(errors),
          });
        }
    
        return next();
      },

      secureRoute(req, res, next) {
        try {
          const authorization = req.headers.authorization.split(' ')[1] || req.headers.token;
          if (!authorization) {
            return res.status(401).json({ error: true, message: 'Access denied, Authorization required' });
          }
          const verifiedToken = verifyToken(authorization);
          if (!verifiedToken.id) {
            return res.status(401).json({ error: true, message: 'Access denied, Invalid token' });
          }
        } catch (err) {
          return res.status(401).json({ error: true, message: 'Access denied, Authorization required' });
        }
        return next();
      },


      async userExists(req, res, next) {
        const { email } = req.body;
        const dbClient = await db.connect();
        try {
            const text = 'SELECT * FROM users WHERE email = $1'
            const values = [email];
            const user = await dbClient.query({ text, values });
            if (user.rowCount) {
                return res.status(409).json({
                    status: 409,
                    error: `User already exists`,
                });
            }
        } catch (err) {
            return;
        } finally {
            await dbClient.release();
        }
        next();
    }

}

export default candidateMiddleware