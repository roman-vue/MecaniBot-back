import axios from 'axios';
import { Vehiculo } from '../utils/interface/vehicle.interface';


const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generarMantenimientos(datosVehiculo: Vehiculo): Promise<string> {
    try {
        const prompt = `
            Tengo un vehículo:
            - Tipo: ${datosVehiculo.type}
            - Modelo: ${datosVehiculo.model}
            - Kilometraje: ${datosVehiculo.km} km
            - Última actualización: ${datosVehiculo.last_maintenance}
            
            Basado en esto, ¿qué mantenimientos debería programar para el futuro? Responde en formato lista.
        `;

        const response = await axios.post(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            contents: [{
                parts: [{ text: prompt }]
            }]
        });

        const recomendaciones = response.data.candidates[0].content.parts[0].text;
        return recomendaciones;
    } catch (error) {
        console.error('Error en Gemini:', error);
        throw error;
    }
}
