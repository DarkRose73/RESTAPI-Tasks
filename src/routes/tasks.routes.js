import { Router } from 'express'
import * as TaskController from '../controllers/task.controller'

const router = Router()

//  DEFINICIÓN DE LAS DISTINTAS RUTAS A UTILIZAR

router.get('/', TaskController.findAllTasks)

router.post('/', TaskController.createTask)

router.get('/done', TaskController.findAllDoneTasks)

router.get('/:id', TaskController.findOneTask)

router.delete('/:id', TaskController.deleteTask)

router.put('/:id', TaskController.updateTask)



export default router