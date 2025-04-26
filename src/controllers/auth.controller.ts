import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth.service";
const authService = new AuthService();


export class AuthController {
    public static async sign_in(req:Request, res:Response, next:NextFunction){
        
    } 

    public static async sign_out(req:Request, res:Response, next:NextFunction){
      try {
        let {deviceId, car_plate}= req.body
        const data = await authService.sign_up(deviceId, car_plate)
        res.status(201).json({
            message: "car_plate registrer success",
            data
        });
      } catch (error) {
         res.status(500).json({status:false, error,})
      }
    }

}