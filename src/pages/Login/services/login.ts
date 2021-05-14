import request from "@/utils/request"


export function login (params: object) {
    return request('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(params)
    })
}