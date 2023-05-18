import axios from 'axios'

const baseURL = ''

export const postTask = async (reqBody) => {
    const {data} = await axios.post(`${baseURL}/tasks`,reqBody)
    return data
}

export const getTasks = async () => {
    const {data} = await axios.get(`${baseURL}/tasks`)
    return data
}

export const deleteTask = async (taskID) => {
    const {data} = await axios.delete(`${baseURL}/tasks/${taskID}`)
    return data
}