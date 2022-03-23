import React, { Component } from 'react';
import DsList from '../../component/list/Ds.List';
import { dsServiceApi } from '../../base/ds_service'
import getDsDialog from "../../component/dialog/Ds.Dialog"
class LexinData extends Component {
    readonly state = {
        dataSource: []
    }
    private dialogRef: any

    fetchHistoryFile = () => {
        let that = this;
        dsServiceApi('lexin.yiliao.get.files', {}).then((data: any) => {
            that.setState({ 'dataSource': data.data.list })
        })
    }

    componentDidMount = () => {
        this.fetchHistoryFile()
    }

    download = (imp: any) => {
        window.open('http://180.76.235.179:8888/download?file=' + imp.file_index)
    }

    handleCancel = () => {
        this.dialogRef.removeDom()
    }
    handleOk = () => {
        let form_data: any = this.dialogRef.$getDialogData()
        this.dialogRef.removeDom()
    }

    setChildRef = (ref: any) => {
        this.dialogRef = ref
    }

    upLoadFile = () => {
        getDsDialog({
            title: "文件上传",
            tips: "excel/...",
            handleOk: this.handleOk,
            handleCancel: this.handleCancel
        }, this.setChildRef)
    }

    render() {
        let that = this;
        return (
            <DsList
                list_title={'乐心医疗'}
                list_meta={[{ 'label': '文件名', 'key': 'file_name' },
                { 'label': '上传日期', 'key': 'upload_time' },
                { 'label': '开始日期', 'key': 'start_date' },
                { 'label': '结束日期', 'key': 'end_date' },
                { 'key': 'operate', 'label': '操作' }]}
                list_data={that.state.dataSource}
                index_key='id'
                row_operate={[{
                    'label': '下载',
                    'func': this.download,
                    'key': 'download'
                }]}
                list_buttons={[{
                    'label': '上传',
                    'onClick': this.upLoadFile,
                    'isImportant': true
                }, {
                    'label': '测试',
                    'onClick': this.upLoadFile,
                    'isImportant': false
                }]}
            />)
    }
}

export default LexinData