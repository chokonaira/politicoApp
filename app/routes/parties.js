import express from 'express';
import partyController from '../controller/parties';
import AuthValidator from '../middleware/auth'

const { secureRoute } = AuthValidator
const router = express.Router();

router.post('/parties', secureRoute, partyController.createParty);
router.get('/parties', secureRoute, partyController.getParties);
router.get('/parties/:partyId', secureRoute, partyController.getParty);
router.patch('/parties/:partyId', secureRoute, partyController.updateParty);
router.delete('/parties/:partyId', secureRoute, partyController.deleteParty);

export default router; 
