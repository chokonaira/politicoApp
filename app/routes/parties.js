import express from 'express';
import partyController from '../controller/parties';

const router = express.Router();

router.post('/api/v1/parties', partyController.createParty);
router.get('/api/v1/parties', partyController.getParties);
router.get('/api/v1/parties/:partyId', partyController.getParty);

export default router;
