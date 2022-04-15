"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => ({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
}));
//# sourceMappingURL=database.config.js.map