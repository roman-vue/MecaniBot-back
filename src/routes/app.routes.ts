import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
const router: Router = Router();

class AppRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    public config(): void {
        //!AUTH
        this.router.post("/signIn", AuthController.sign_in);
        this.router.post("/signUp", AuthController.sign_out);
    }
}

const AppRoutes = new AppRouter();
export default AppRoutes.router;