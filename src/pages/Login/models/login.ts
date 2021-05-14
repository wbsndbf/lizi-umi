import { login } from "../services/login"
import jwt from 'jwt-decode'


export default {
    namespace: 'login',
    state: {
        nickname: localStorage.getItem('nickname') || '' ,
        authority: localStorage.getItem('authority') || '',
        username: localStorage.getItem('username') || '',
        id: localStorage.getItem('id') || ''
    },
    reducers: {
        setData(state: object, { payload: { nickname, authority, username, id }}: any) {
            return {...state, nickname, authority, username, id}
        }
    },
    effects: {
        *fetch({ payload }: any, { call, put, select }: any) {
            const res: {
                data?: object,
                token?: string,
                msg: string,
                state: string
            } = yield call(login, payload)
            if (res) {
                const { id, nickname, username, type }: any = (jwt as any)(res.token)
                const authority = type === '0' ? 'admin' : 'user'
                yield put({ type: 'setData' , payload: { id, nickname, username, authority }})
            }   
            return res
        }
    },
    subscriptions: {
    },
  }