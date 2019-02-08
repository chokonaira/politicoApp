import express from 'express';
import officeController from '../controller/offices';
import AuthValidator from '../middleware/auth'

const { secureRoute } = AuthValidator

const router = express.Router();

router.post('/offices', secureRoute, officeController.createOffice);
router.get('/offices', secureRoute, officeController.getOffices);
router.get('/offices/:officeId', secureRoute, officeController.getOffice);


export default router;
