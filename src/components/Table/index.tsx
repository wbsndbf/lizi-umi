import styles from './index.scss'
import { Table } from 'antd'

// 内容容器
const index = ({ className, ...rest }: any) => (

    <div className={ styles['table-common'] }>
        <Table className={ `table-wrapper ${className}` } {...rest} />
    </div>
   

)



export default index