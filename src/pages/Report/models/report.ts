import * as reportsServices from '../services/report'

type resType = {
    data?: any,
    msg: string,
    state: string
} 

export default {
    namespace: 'report',
    state: {
        allUsersList: [],
        reportsList: [],
        total: 0,
        page: 1,
        pageSize: 6
    },
    reducers: {
        setData (state: object, 
            { payload: { allUsersList } }: { payload: { allUsersList: []} }) {
            return { ...state, allUsersList }
        },
        setReports(state: object, { payload: { reportsList, total, page } }: any) {
            return { ...state, reportsList, total, page }
        }
    },
    effects: {
        *getAllusers({}, { put, call }: any) {
            // 调用 saveTodoToServer，成功后触发 `add` action 保存到 state
            const res: resType = yield call(reportsServices.getAllUsers);
            if (res && res.state === 'success') {
                yield put({ type: 'setData' , payload: { allUsersList: res.data }})
            } else {
                yield put({ type: 'setData' , payload: {
                    allUsersList: []
                }})
            }
        },
        *getAllReports({payload: { page, pageSize }}: any, { put, call }: any) {
            // 调用 saveTodoToServer，成功后触发 `add` action 保存到 state
            const res: resType = yield call(reportsServices.getReportsList, page, pageSize);
            if (res && res.state === 'success') {
                yield put({ 
                    type: 'setReports' , 
                    payload: {
                        reportsList: res.data.list, 
                        total: res.data.total,
                        page,
                        pageSize
                    }
                })
            } else {
                yield put({ type: 'setReports' , payload: {
                    reportsList: [],
                    total: 0,
                    page: 1,
                    pageSize: 6
                }})
            }
        },
        *add({ payload }: any, { call }: any) {
            const res: resType = yield call(reportsServices.add, payload)
            return res
        }
    },
    subscriptions: {
        setup({ history, dispatch }: any) {
            // 监听 history 变化，当进入 `/` 时触发 `load` action
            return history.listen(({ pathname }: any) => {
                if (pathname === '/report/write') {
                    dispatch({ type: 'getAllusers' });
                }
            });
        },
    },
}