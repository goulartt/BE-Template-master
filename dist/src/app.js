"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = require("body-parser");
const db_1 = require("./models/db");
const contract_route_1 = require("./routes/contract.route");
const job_route_1 = require("./routes/job.route");
const profile_route_1 = require("./routes/profile.route");
const app = (0, express_1.default)();
app.set('sequelize', db_1.sequelize);
app.set('models', db_1.sequelize.models);
app.use(bodyParser.json());
app.use(contract_route_1.default);
app.use(job_route_1.default);
app.use(profile_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map