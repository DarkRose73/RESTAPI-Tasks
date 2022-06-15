import Task from "../models/Task"
import { getPagination } from "../libs/getPagination"

//  TODAS LAS FUNCIONALIDADES DE LAS DISTINTAS RUTAS

export const findAllTasks = async (req, res) => {
    try {
        const { size, page } = req.query
        const { limit, offset } = getPagination(page, size)
        //  Crear una constante para guardar los elementos de la db
        const data = await Task.paginate({}, { offset, limit })
        //  Responder al usuario con los datos consultados de la db
        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something went wrong finding the tasks"
        })
    }
}

export const createTask = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({ message: 'Content cannot be empty' })
    }
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        })
        const taskSaved = await newTask.save()
        res.json(taskSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something went wrong creating the task"
        })
    }
}

export const findOneTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        if (!task) return res.status(404).json({
            message: `Task ${id} doesn't exists`
        })
        res.json(task)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong searching the task"
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const data = await Task.findByIdAndDelete(req.params.id)
        res.json({
            message: `${req.params.id} The Task ${data.title} was successfully deleted`
        })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting the task"
        })
    }
}

export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({ done: true })
    res.json(tasks)
}

export const updateTask = async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json(updatedTask)
}