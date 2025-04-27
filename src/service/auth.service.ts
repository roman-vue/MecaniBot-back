import { supabase } from "../database/supabase"
import { generarMantenimientos } from "../ia/gemeni.ia.service";
import { Vehiculo } from "../utils/interface/vehicle.interface";
export class AuthService {
    public async sign_in() {
    }

    public async sign_up(deviceId:string, car_plate:string, type, model, km, last_maintenance) {
        try {
            const { data: existingUsers, error: findError } = await supabase
                .from('users')
                .select('*')
                .eq('deviceId', deviceId);

            if (findError) {
                console.error('Error buscando usuario:', findError);
                throw findError;
            }

            if (existingUsers && existingUsers.length > 0) {
                // 2. Verificar si la placa ya está registrada para ese deviceId
                const placaExistente = existingUsers.find(user => user.car_plate === car_plate);
                if (placaExistente) {
                    throw new Error('Esta placa ya está registrada para este dispositivo.');
                }
            }

            // 3. Insertar nuevo usuario
            const { data: newUser, error: insertError } = await supabase
                .from('users')
                .insert([
                    { deviceId, car_plate, type, model, km, last_maintenance }
                ])
                .select();

            if (insertError) {
                console.error('Error registrando usuario:', insertError);
                throw insertError;
            }

            // 4. Llamar a Gemini para generar recordatorios
            const recomendaciones = await generarMantenimientos(
                type,
                model,
                km,
                last_maintenance
            );

            if (!Array.isArray(recomendaciones)) {
                throw new Error('Formato inválido de respuesta de Gemini.');
            }

            // 5. Insertar los recordatorios en la tabla reminders
            const inserts = recomendaciones.map((rec) => ({
                message: rec.message,
                regiter: 0, // (o register si corriges el typo en la tabla)
                dataTime: rec.dateTime
            }));

            const { data: remindersData, error: remindersError } = await supabase
                .from('reminders')
                .insert(inserts);

            if (remindersError) {
                console.error('Error insertando recordatorios:', remindersError);
                throw remindersError;
            }

            return { user: newUser, reminders: remindersData };

        } catch (error) {
            console.error('Error registrando usuario:', error);
            throw error;
        }
    }
}