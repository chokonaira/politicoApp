import express from 'express'
import partyController from '../controller/parties'

const router = express.Router()

router.post('/', partyController.createParty)


export default router