import React from "react";
import "./style.css"
const axios = require('axios');


interface commomComponentOptions {
    dsKey: string,
    dsLabel: string,
    $setDialogData: Function,
    dsOptions?: { [p: string]: any }
}

const DsUploadExcel: React.FC<commomComponentOptions> = (props: commomComponentOptions) => {
    var input_ref: any = React.createRef();

    const setDialogData = props.$setDialogData;
    var file_index: string = ''

    const onvalueChange = (_v: any) => {
        if (_v) file_index = _v

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
            onvalueChange(res.index)
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


    return (
        <div>
            <input name="file" type="file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ref={input_ref} onChange={fileChange} multiple />
            <div className="ds-upload" id={props.dsKey}>
                <span className="common-label">{parseLabel()}</span>
                <div className='ds-upload-load-box' onClick={chooseFile}>+</div>
            </div>
        </div>
    )


}

export default DsUploadExcel