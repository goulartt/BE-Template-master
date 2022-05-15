import { Router } from 'express';
import getProfile  from '../middlewares/profile.middleware';

import * as jobsController from '../controllers/job.controller';

const router = Router();

router.get('/jobs/unpaid', getProfile, jobsController.getAllUnpaindJobs);
router.post('/jobs/:job_id/pay', getProfile, jobsController.payJob);

export default router;