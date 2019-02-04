import express from 'express';
import partyController from '../controller/parties';

const router = express.Router();

router.post('/parties', partyController.createParty);
router.get('/parties', partyController.getParties);
router.get('/parties/:partyId', partyController.getParty);

export default router;
