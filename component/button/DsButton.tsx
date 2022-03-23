import React from "react";
import './style.css'

export interface buttonOption {
    onClick: Function,
    label: string,
    isImportant?: boolean,
    index?: number,
    buttonClass?: string
}

export interface buttonGroupOption {
    buttons: Array<buttonOption>
}

export const DsButton: React.FC<buttonOption> = (props: buttonOption) => {
    const DsClick = (fn: any) => {
        (fn instanceof Function) && fn()
    }
    return (
        <div className={props.buttonClass} onClick={() => DsClick(props.onClick)}>{props.label}</div>
    )
}

export const DsButtonGroup: React.FC<buttonGroupOption> = (props: buttonGroupOption) => {
    const getBtnClass = (btn: buttonOption, idx: number) => {
        let class_name = 'ds-button'
        if (idx === 0) class_name += ' ds-last-button'
        if (btn.isImportant) class_name += ' ds-main-button'
        return class_name
    } 
    const getDsButtons = () => {
        const buttons = props.buttons;
        buttons.sort((a: buttonOption, b: buttonOption) => { return (a.index || 0) - (b.index || 0) })
        return buttons.map((_b: buttonOption, _i: number) => { 
            return <DsButton label={_b.label} onClick={_b.onClick} isImportant={_b.isImportant} buttonClass={getBtnClass(_b, _i)} /> 
        })
    }

    return (
        <div className="ds-button-group">
            {getDsButtons()}
        </div>
    )
}
