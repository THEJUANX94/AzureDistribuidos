"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
async function main() {
    try {
        await db_1.appDataSource.initialize();
        console.log('Database connected');
        const port = process.env.PORT || 3000;
        app_1.default.listen(port);
        console.log('Sever listen on port', 3000);
    }
    catch (error) {
        console.error(error);
    }
}
main();
