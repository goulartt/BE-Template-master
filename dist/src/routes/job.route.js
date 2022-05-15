"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_middleware_1 = require("../middlewares/profile.middleware");
const jobsController = require("../controllers/job.controller");
const router = (0, express_1.Router)();
router.get('/jobs/unpaid', profile_middleware_1.default, jobsController.getAllUnpaindJobs);
router.post('/jobs/:job_id/pay', profile_middleware_1.default, jobsController.payJob);
exports.default = router;
//# sourceMappingURL=job.route.js.map