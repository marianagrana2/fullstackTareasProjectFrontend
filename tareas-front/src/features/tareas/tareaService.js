import axios from "axios";

const API_URL = 'http://localhost:5005/api/tareas/'

//Crear una tarea
const crearTarea = async (tareaData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, tareaData, config)

    return response.data
}

//Obtener lista de  tareas del user
const getTareas = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

//Delete una tarea 
const deleteTarea = async (idtarea,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + idtarea, config)

    return response.data
}
const tareaService = {
    crearTarea,
    getTareas,
    deleteTarea
}

export default tareaService