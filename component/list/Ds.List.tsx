import React, { Component, FC } from "react";
import { Link } from "react-router-dom";
import {DsButtonGroup, buttonOption} from "../button/DsButton";
import './style.css'

interface ListOperateOption { func: Function, label: string, key: string }

interface ListOption {
    list_meta: Array<metaOption>,
    list_data: Array<any>,
    list_title: string,
    operate?: Array<any>,
    index_key: string,
    row_operate?: Array<ListOperateOption>,
    list_buttons: Array<buttonOption>
}

interface ListRowOption {
    value: { [p: string]: any }
    index_key?: string,
    list_meta: Array<any>,
    parent_func?: {
        [p: string]: Function
    }
}

interface ListCellOption {
    value: { [p: string]: any }
    index_key?: string,
    _index: number,
    parent_func?: {
        [p: string]: Function
    }
}

interface metaOption {
    key: string,
    label: string,
    width?: number
}

const ListCell: FC<ListCellOption> = (option: ListCellOption) => {
    const class_name = option._index === 0 ? "item first" : "item"
    return (
        <div className={class_name} key={option.index_key}>{option.value}</div>
    )
}

const ListOperateCell: FC<ListCellOption> = (option: ListCellOption) => {
    const row_operate = option.parent_func?.getListOperate()
    return (
        row_operate.map((_func_c: ListOperateOption) => {
            return (
                <div className="item operate-item" key={_func_c.key}>
                    <span className="download" onClick={() => (_func_c.func(option.parent_func?.getRowData()))}>{_func_c.label}</span>
                </div>
            )
        })
    )
}

const ListRow: FC<ListRowOption> = (option: ListRowOption) => {
    const getRowData = () => {
        return option.value
    }
    return (
        <div className="data-row" id={option.value[option.index_key!]}>
            {option.list_meta.map((_m: metaOption, _index: number) => {
                if (_m.key === 'operate') {
                    return (
                        <ListOperateCell _index={_index} key={_m.key} value={option.value[_m.key]} parent_func={Object.assign((option.parent_func || {}), { 'getRowData': getRowData })} />
                    )
                }
                return <ListCell _index={_index} key={_m.key} value={option.value[_m.key]} parent_func={Object.assign((option.parent_func || {}), { 'getRowData': getRowData })} />
            })}
        </div>
    )
}

class DsList extends Component<ListOption> {
    constructor(props: ListOption) {
        super(props)
    }

    cellClick = (e: any, v: any) => {
        debugger
    }

    readonly state = {
        show_operate: false
    }

    componentDidMount = () => {
        this.props.row_operate ?? this.props.list_meta.push({ 'key': 'operate', 'label': '操作' });
        this.setState({ 'show_operate': !(this.props?.list_buttons && this.props.list_buttons.length > 0) })
    }

    setMeta = () => {
        let that = this;
        return (
            that.props.list_meta.map((_m: any) => {
                return <div className="item meta-item" key={_m.key}>{_m.label}</div>
            })
        )
    }

    getListOperate = () => {
        return this.props.row_operate
    }

    render() {
        let that = this;
        return (
            <div className="ds-list">
                <div className="header">
                    {that.props.list_title}
                </div>
                <div className="operate" hidden={that.state.show_operate}>
                    <DsButtonGroup buttons={that.props.list_buttons} />
                </div>
                <div className="list-content">
                    <div className="meta-row">
                        {that.setMeta()}
                    </div>
                    <div className="datas">
                        {this.props.list_data.map((_d) => {
                            return <ListRow value={_d} index_key={this.props.index_key} list_meta={that.props.list_meta} parent_func={{ 'getListOperate': that.getListOperate }} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default DsList