"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const Students_routes_1 = __importDefault(require("./routes/Students.routes"));
const Subjects_routes_1 = __importDefault(require("./routes/Subjects.routes"));
const Registration_routes_1 = __importDefault(require("./routes/Registration.routes"));
const Auth_routes_1 = __importDefault(require("./routes/Auth.routes"));
const Principal_routes_1 = __importDefault(require("./routes/Principal.routes"));
const response_time_1 = __importDefault(require("response-time"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express_1.default.json());
app.use((0, response_time_1.default)());
app.use(Students_routes_1.default);
app.use(Subjects_routes_1.default);
app.use(Registration_routes_1.default);
app.use(Auth_routes_1.default);
app.use(Principal_routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
exports.default = app;
