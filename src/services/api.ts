import axios from 'axios'

interface loginData {
    username: string;
    password: string;
}


// 检查请求状态
function checkStatus(res: { data: any; status: number;}): any {
    if (res.status >= 200 && res.status < 300) {
        return res.data 
    }
    return { datas: [], success: false, keywords: ''}
}

// 登录
export const login = (params: object) => {
    return axios.post('/api/user/login', params)
        .then(checkStatus)
}