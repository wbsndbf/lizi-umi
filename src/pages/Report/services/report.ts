import request from "@/utils/request"
import userInfo from '../models/report'

export function getAllUsers() {

    return request(`/api/users/all_users`)
}

export function add(params: any) {

    return request(`/api/users/add_report/${localStorage.id}`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export function getReportsList(page: number, pageSize: number) {

    return request(`/api/users/reports/${page}/${pageSize}/${localStorage.id}`);
}

export function getReportInfo(id: string) {
    return request(`/api/users/report_detail/${localStorage.id}/${id}`);
}

export function update(params: any) {
    return request(`/api/users/edit_report/${localStorage.id}/${params.id}`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export function remove(id: string) {
    return request(`/api/users/delete_report/${localStorage.id}/${id}`, {
      method: 'DELETE',
    });
  }