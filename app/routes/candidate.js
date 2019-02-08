import express from 'express';
import candidateController from '../controller/candidate';
import candidateValidator from '../middleware/candidate'
import AuthValidator from '../middleware/auth'
 
const { secureRoute } = AuthValidator
const { userExists, officeExists, isCandidateRegistered, isFieldEmpty} = candidateValidator

const router = express.Router();

router.post('/office/:userId/register', secureRoute, userExists, officeExists, isCandidateRegistered, isFieldEmpty, candidateController.register);

export default router; 



// import express from 'express';
// import userController from '../controller/users';

// const router = express.Router();

// router.post('/auth/signup', userController.signup);
// router.post('/auth/login', userController.login);

// export default router; 
