"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_middleware_1 = require("../middlewares/profile.middleware");
const contractController = require("../controllers/contract.controller");
const router = (0, express_1.Router)();
router.get('/contracts/:id', profile_middleware_1.default, contractController.getContractById);
router.get('/contracts', profile_middleware_1.default, contractController.getAllContracts);
exports.default = router;
//# sourceMappingURL=contract.route.js.map