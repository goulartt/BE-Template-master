import { Router } from 'express';
import getProfile from '../middlewares/profile.middleware';

import * as profileController from '../controllers/profile.controller';

const router = Router();

router.post('/balances/deposit/:userId', getProfile, profileController.depositMoney);

router.get('/admin/best-profession', getProfile, profileController.bestProfissional);
router.get('/admin/best-clients', getProfile, profileController.bestClients);

export default router;