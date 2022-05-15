"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_middleware_1 = require("../middlewares/profile.middleware");
const profileController = require("../controllers/profile.controller");
const router = (0, express_1.Router)();
router.post('/balances/deposit/:userId', profile_middleware_1.default, profileController.depositMoney);
router.get('/admin/best-profession', profile_middleware_1.default, profileController.bestProfissional);
router.get('/admin/best-clients', profile_middleware_1.default, profileController.bestClients);
exports.default = router;
//# sourceMappingURL=profile.route.js.map