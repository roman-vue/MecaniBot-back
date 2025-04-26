"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
var AppRouter = /** @class */ (function () {
    function AppRouter() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    AppRouter.prototype.config = function () {
        //!AUTH
        this.router.post("/signIn", auth_controller_1.AuthController.sign_in);
        this.router.post("/signUp", auth_controller_1.AuthController.sign_out);
    };
    return AppRouter;
}());
var AppRoutes = new AppRouter();
exports.default = AppRoutes.router;
//# sourceMappingURL=app.routes.js.map