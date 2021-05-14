import { CompassOutlined } from '@ant-design/icons'
import { addUsers, deleteUser, editUsers, getUsers } from '../services/users'

export default {
    namespace: 'users',
    state: {
        list: [],
        total: 0,
        page: 1,
        pageSize: 5
    },
    reducers: {
        setData(state: object, { payload: { list, total, page }}: any) {
            return {...state, list, total, page}
        }
    },
    effects: {
        *fetch({ payload: { page } }: { payload: { page: number } }, { call, put, select }: any) {
            const pageSize: number = yield select((state: any) => state.users.pageSize)
            const res: {
                data?: object,
                msg: string,
                state: string
            } = yield call(getUsers, { page, pageSize })
            if (res && res.state === 'success') {
                yield put({ type: 'setData' , payload: { ...res.data, page }})
            } else {
                yield put({ type: 'setData' , payload: { list: [], total: 0 }})
            }
        },
        *add({ payload }: 
                { payload: { 
                    username: string,
                    password: string,
                    type: string 
                } }, { call }: any) {
            const res: {
                data?: object,
                msg: string,
                state: string
            }  = yield call(addUsers, payload) 
            return res      
        },
        *edit({ payload: { id, value }}: {
            payload: {
                id: string,
                value: {
                    username: string,
                    password: string,
                    type: string 
                }
            }
        } , { call }: any) {
            const res: {
                data?: object,
                msg: string,
                state: string
            }  = yield call(editUsers, id, value) 
            return res      
        },
        *delete({ payload }: { payload: { id: string } } , { call }: any) {
            const res: {
                data?: object,
                msg: string,
                state: string
            }  = yield call(deleteUser, payload) 
            return res      
        }
    },
    subscriptions: {
        setup ({ dispatch, history }: any) {
            // 首先要判断当前的路径
            return history.listen((({ pathname }: { pathname: string }) => {
                if (pathname === '/users') {
                    dispatch({ type: 'fetch', payload: { page: 1 } })
                }
            }))
        }
    },
  }