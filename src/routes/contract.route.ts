import { Router } from 'express';
import getProfile from '../middlewares/profile.middleware';

import * as contractController from '../controllers/contract.controller';

const router = Router();

router.get('/contracts/:id', getProfile, contractController.getContractById);
router.get('/contracts', getProfile, contractController.getAllContracts);

export default router;