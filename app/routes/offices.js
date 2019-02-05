import express from 'express';
import officeController from '../controller/offices';

const router = express.Router();

router.post('/offices', officeController.createOffice);


export default router;
