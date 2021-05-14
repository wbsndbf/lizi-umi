import request from "@/utils/request"


export function getUsers ({page, pageSize}: { page: number, pageSize: number }) {
    return request(`/api/users/get_users/${page}/${pageSize}`)
}

export function addUsers (params: any) {
    return request(`/api/users/add_user`, {
        method: 'POST',
        body: JSON.stringify(params)
    })
}

export function editUsers (id: string, params: any) {
    return request(`/api/users/edit_user/${id}`, {
        method: 'POST',
        body: JSON.stringify(params)
    })
}

export function deleteUser (id: string) {
    return request(`/api/users/delete_user/${id}`, {
        method: 'DELETE'
    })
}