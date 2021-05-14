import { fetch } from 'dva'
import { notification } from 'antd';
import { history } from 'umi'


const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
}

export default async function request (url: string, options: object = { method: 'GET' }) {
    return await (fetch as any)(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkStatus)
        .catch(checkErrorStatus)
}

function checkStatus (res: any) {
    if (res.status >= 200 && res.status < 300) {
        return res.json()
    }

    // 请求报错
    const errorText = codeMessage[res.status] 

    // 提示错误信息
    notification.error({
        message: `请求错误${ res.status } ${ res.url }`,
        description: errorText
    })

    // 抛出异常
    const error = new Error(errorText)
    error.name = res.status
    error.res = res
    throw error
}

function checkErrorStatus (err: any) {
    if (err && err.res) {
        // 拿到异常状态
        const { status } = err.res
        // if (status === 403) {
        //     history.push('/exception/403')
        // }

        // if (status <= 504 && status >= 500) {
        //     history.push('/exception/500')
        // }

        // if (status >= 404 && status <= 422) {
        //     history.push('/exception/404')
        // }
    }
}