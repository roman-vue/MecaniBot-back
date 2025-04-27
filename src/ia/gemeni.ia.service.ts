import axios from 'axios';
import { Type } from '../utils/type.enum';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = 'eltrilococo'

export async function generarMantenimientos(tipo: Type, modelo: string, kilometraje: string, ultimaActualizacion: string) {
    try {
        const prompt = `
        Eres una IA que responde estrictamente solo en formato JSON válido.
        
        Tengo un vehículo con estas características:
        - Tipo: ${tipo} (electrobici, bike o car)
        - Modelo: ${modelo}
        - Kilometraje actual: ${kilometraje} km
        - Último mantenimiento: ${ultimaActualizacion} (formato YYYY-MM-DD)
        
        Tu tarea:
        - Sugiere mantenimientos futuros.
        - Para cada mantenimiento, indica una fecha aproximada basada en el último mantenimiento.
        - Devuelve únicamente un array en formato JSON.
        - Usa internamente JSON.stringify para formatearlo.
        - No pongas explicaciones.
        - No pongas texto.
        - No pongas bloques \`\`\`json ni ningún \`\`\` extra.
        - No uses mardown para poner el json
        - Solo responde el JSON puro, comenzando directamente con "[" y terminando con "]".
        
        Ejemplo:
        
        [
          {
            "message": "Cambio de aceite",
            "dateTime": "2025-06-20"
          },
          {
            "message": "Revisión de frenos",
            "dateTime": "2025-08-20"
          }
        ]
        `;
        const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: [{
                parts: [{ text: prompt }]
            }]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let text:string = response.data.candidates[0].content.parts[0].text;
        // Elimina las tres tildes invertidas y el texto "json"
        let limpio = text.replace(/```json\n?/, '').replace(/```/, '');

        const recomendaciones = JSON.parse(limpio);
        return recomendaciones;
    } catch (error: any) {
        console.error('Error al consultar Gemini:', error.response?.data || error.message);
        throw error;
    }
}
