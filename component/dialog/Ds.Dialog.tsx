import React from 'react'
import ReactDOM from 'react-dom';
import './style.css'
import { DsButtonGroup } from '../button/DsButton';
import DsUploadExcel from "../upload/Ds.Upload"
const axios = require('axios');

interface DsDialogOptions {
    title: string, tips: string, handleOk: any, handleCancel: any, dom?: any
}

class DsDialog extends React.Component<DsDialogOptions> {
    private dom: any;
    private dialogData: {[p:string]:any} = {};
    constructor(props: DsDialogOptions) {
        super(props)
        this.dom = props.dom
    }

    removeDom() {
        this.dom && this.dom.remove()
    }

    $setDialogData = (chidlData: { [p: string]: any }) => {
        Object.assign(this.dialogData, chidlData)
    }

    $getDialogData  = () => {
        return this.dialogData
    }

    render() {
        let props = this.props;
        let that = this;
        return (
            <div className='mask'>
                <div className='ds-dialog'>
                    <div className="ds-dialog-title">
                        <span>{props.title}</span>
                        <span onClick={() => this.removeDom()}>X</span>
                    </div>
                    <div className="ds-dialog-content">
                        <DsUploadExcel dsKey='attachment' dsLabel='附件' $setDialogData={that.$setDialogData} />
                    </div>
                    <div className='ds-dialog-buttons'>
                        <DsButtonGroup buttons={[{
                            label: '取消',
                            onClick: that.props.handleCancel
                        }, {
                            label: '确定',
                            onClick: that.props.handleOk,
                            isImportant: true
                        }]} />
                    </div>
                </div>
            </div>
        );
    }
}

export default (prup: DsDialogOptions, ref: any) => {
    let cur_dom = document.createElement('div')
    ReactDOM.render(<DsDialog title={prup.title}
        tips={prup.tips}
        handleCancel={prup.handleCancel}
        handleOk={prup.handleOk}
        dom={cur_dom}
        ref={ref} />, cur_dom)
    document.body.appendChild(cur_dom)
}