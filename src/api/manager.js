import axios from '@/axios'

export function Login(data){
    return axios.post('/admin/login',data)
}

export function Logout(data){
    return axios.post('/admin/logout')
}

export function GetUserInfo(data){
    return axios.post('/admin/getinfo',data)
}

export function EditPassword(data){
    return axios.post('/admin/updatepassword',data)
}