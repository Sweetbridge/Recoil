import * as React from 'react';
import * as classNames from 'classnames';

import Open from '../Open/Open';
import Table from '../Table/Table';

import {IColumn} from './IColumn';

export interface ITableColumnDetailProps {
    element?: any;
    columns?: IColumn[];
    detailTemplate?: (element: any) => JSX.Element;
    detailTemplateOpenAll?: any;
    detailTemplateSelectedElements?: any[];
    checkable?: boolean;
    selectedKey?: string;
}

export default class TableColumnDetail extends React.Component<ITableColumnDetailProps,any>{
    shouldComponentUpdate(){
        return true;
    }
    render() {

        const self = this;
        const props = self.props;
        let {element, columns, detailTemplate, detailTemplateOpenAll, detailTemplateSelectedElements, checkable, selectedKey} = props;

        if (detailTemplate) {
            return (
                <Open if={detailTemplateSelectedElements.includes(selectedKey ? element[selectedKey] : element) || detailTemplateOpenAll}>
                    {self.props.detailTemplate(element) }
                </Open>
            )
        } else return null;
    }
}