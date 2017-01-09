import * as React from 'react';
import * as classNames from 'classnames';

import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import {IColumn} from './IColumn';

interface ITableDataProps {
    value ?: Array<any>;
    renderChild? : any;
    column?: IColumn;
    element? : any;
    hideColumns? : any;
    isArray? : boolean;
}

interface ITableDataState {
    type ?: string;
}

export default class TableColumn extends React.Component<ITableDataProps,ITableDataState>{

    constructor(){
        super();
        this.state = {
            type : ''
        }
    }

    componentDidMount() {
        this.renderType();
    }

    renderType() {
        const self = this;
        const props = self.props;
        let {value} = props;
        
        if (value instanceof Array) {
            this.setState({
                type : 'Array'
            })
        } else if (typeof value === 'object' && value !== null) {
            this.setState({
                type: 'Object'
            })
        } else {
            this.setState({
                type: 'Value'
            })
        }
    }

    render() {
        const self = this;
        let state = self.state;
        let {type} = state;
        let {value, column, element, hideColumns, isArray} = self.props;

        let hideColumnsArrayIncludesEitherNameOrTitle = hideColumns && hideColumns.includes(column.title ? column.title : column.name);

        if (isArray) {
            return (
                <td width={column.width}>
                    {element}
                </td>
            )           
        } else if (type !== '' && !hideColumnsArrayIncludesEitherNameOrTitle) {
            return (
                <td width={column.width}>
                    {column.template ? column.template(element) : type === 'Value' ? value ? value.toString() : null : <Dropdown material dataSource={value} title={type} />}
                </td>
            )
        } return null;
    }
}