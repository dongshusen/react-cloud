import React, { createRef } from "react";

interface dsPageOption {
    total: any,
    fetchData: Function
}

const DsPage:React.FC<dsPageOption> = (props:dsPageOption)=> {
    var current_page_ref:any = createRef()
    var current_page = 1


    const setPage = (_c: number) => {
        current_page += _c
        current_page_ref.current.innerText = current_page
        props.fetchData(current_page)
    }

    return (
        <div>
            <span>共计：{props.total} </span>
            <span onClick={()=>(setPage(-1))}>上一页</span>
            <span ref={current_page_ref}>第 {current_page} 页</span>
            <span onClick={()=>(setPage(1))}>下一页</span>
        </div>
    )

}

export default DsPage