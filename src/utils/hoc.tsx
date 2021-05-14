// import React from 'react'
// export const withClick = (element: any, handleClick = () => {}) => {
//     return React.cloneElement(element, {
//         onClick: handleClick
//     })
// }

export const withClick = (element: any, handleClick = () => {}) => {
    if (!element) return
    // 判断元素是否是DOM对象 如果是对象的话 那么重组 否则的话 返回 span 元素
    if (Object.prototype.toString.call(element) === '[object Object]') {
        return <element.type { ...element.props } onClick={ handleClick } />
    }
    return <span onClick={ handleClick }>{ element }</span>
    
}



// 克隆子元素button 并添加事件方法 HOC（高阶组件）
// 第一个参数是 克隆元素，第二个元素为点击时触发的事件

