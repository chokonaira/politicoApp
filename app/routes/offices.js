import express from 'express';
import officeController from '../controller/offices';

const router = express.Router();

router.post('/offices', officeController.createOffice);
router.get('/offices', officeController.getOffices);
router.get('/offices/:officeId', officeController.getOffice);


export default router;
