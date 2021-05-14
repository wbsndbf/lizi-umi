import styles from './index.scss'

// 内容容器
export const Content = ({ className, ...rest }: any) => (
    <div className={ `${styles['content-wrapper']} ${className}`} {...rest} />

)

// 内容容器
export const Tool = ({ className, ...rest }: any) => (
    <div className={ `${styles['tool-wrapper']} ${className}`} {...rest} />

)