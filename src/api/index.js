import axios from '@/axios'

export function getStatistics1(data){
    return axios.get('/admin/statistics1',data)
}

export function getStatistics2(data){
    return axios.get('/admin/statistics2',data)
}