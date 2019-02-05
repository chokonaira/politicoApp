import express from 'express';
import officeController from '../controller/offices';

const router = express.Router();

router.post('/offices', officeController.createOffice);
router.get('/offices', officeController.getOffices);


export default router;
