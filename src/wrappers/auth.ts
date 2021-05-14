import { history } from 'umi'

export default (props: any) => {
    const isAuthority = localStorage.authority === 'admin'
    if (isAuthority) {
        return props.children
    } else {
        history.push('/')
        return props.children
    }
}