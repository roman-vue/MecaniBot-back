import { supabase } from "../database/supabase"
import { Vehiculo } from "../utils/interface/vehicle.interface";
export class AuthService {
    public async sign_in() {
    }

    public async sign_up(deviceId:string, car_plate:string) {
        try {
            const { data, error } = await supabase
                .from('usuarios')
                .insert([
                    { deviceId, car_plate }
                ]);

            if (error) {
                console.error('Error registrando usuario:', error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error registrando usuario:', error);
            throw error;
        }
    }
}