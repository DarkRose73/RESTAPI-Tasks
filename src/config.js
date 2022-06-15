//  Leer la variable de entorno
import { config } from 'dotenv'
config();

//  Exportar la variable de entorno para una lectura mas facil
export default {
    mongodbURL: process.env.MONGODB_URI || 'mongodb://localhost/tasksdb'
}