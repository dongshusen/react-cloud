import React from "react";
import "./style.css"
import ReactDom from "react-dom"
const axios = require('axios');


interface commomComponentOptions {
    dsKey: string,
    dsLabel: string,
    $setDialogData: Function,
    dsOptions?: { [p: string]: any }
}

const DsUploadExcel: React.FC<commomComponentOptions> = (props: commomComponentOptions) => {
    var input_ref: any = React.createRef();
    var upload_ref: any = React.createRef();

    const setDialogData = props.$setDialogData;
    var file_index: string = ''

    const onvalueChange = (_v: any) => {
        if (_v) {
            let upload_dom = upload_ref.current
            ReactDom.render(
                <div className="ds-upload-files">
                    <div className="ds-uploaded-files">
                        <img src="/img?img_name=excel.png" alt="啊哦，图片不见了" width="80px" />
                        <span className="ds-uploaded-file_name">{_v}</span>
                    </div>
                    <div className='ds-upload-load-box' onClick={chooseFile}>+</div>
                </div>
                    ,
                upload_dom
            )
        }

        let data: { [p: string]: any } = {}
        data[props.dsKey] = _v
        setDialogData(data)
    }

    const fileChange = (file_data: any) => {
        const formdata = new FormData()
        formdata.append('file', file_data.target.files[0])
        axios({
            method: 'post',
            url: '/upload',
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function (res: any) {
            onvalueChange(res.data.file_index)
        }, function (err: any) {
            onvalueChange(null)
        })
    }

    const chooseFile = () => {
        input_ref.current.click()
    }

    const parseLabel = () => {
        let pre_label: string = props.dsLabel
        file_index !== '' && (pre_label += file_index)
        return pre_label
    }
    const setUploadDom = () => {

    }


    return (
        <div>
            <input className="ds-upload-none-input" name="file" type="file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ref={input_ref} onChange={fileChange} multiple />
            <div className="ds-upload" id={props.dsKey}>
                <span className="common-label">{props.dsLabel}</span>
                <div ref={upload_ref}>
                    <div className="ds-upload-files">
                        <div className='ds-upload-load-box' onClick={chooseFile}>+</div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default DsUploadExcel