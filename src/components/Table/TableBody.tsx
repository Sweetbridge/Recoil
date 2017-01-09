import * as React from 'react';
import * as classNames from 'classnames';

import TableRow from './TableRow';
import TableDetail from './TableDetail';
import TableSelectable from './TableSelectable';

import {IColumn} from './IColumn';

export interface TableBodyProps {
    // initial dataSource loaded as prop
    dataSource: Array<any> | Object;
    // columns defined by user
    columns?: Array<IColumn>;
    // a detail template function that returns a view
    detailTemplate?: (element: any) => JSX.Element;

    selectedElements?: Array<any>;

    detailTemplateOpenAll?: any;
    detailTemplateToggleSelectedElements?: any;
    detailTemplateSelectedElements?: Array<any>;
    detailTemplateHideToggle?: boolean;

    toggleSelectedElements?: any;
    rowIsSelectable?: any;

    checkable?: boolean;
    hideColumns ? : Array<any>;
    onRowSelect ? : (event: React.MouseEvent) => void;
    isArray?: boolean;
    detailTemplateOpenOnRowSelect?: boolean | "single";
    selectedKey?: string;
    filterRow?: any;
    filterOpenDetailTemplate?: any;
}

export default class TableBody extends React.Component<TableBodyProps,any>{

    render() {

        const self = this;
        const props = self.props;
        
        let {
            dataSource, 
            columns, 
            detailTemplate,

            selectedElements,

            detailTemplateOpenAll, 
            detailTemplateToggleSelectedElements, 
            detailTemplateSelectedElements,
            detailTemplateHideToggle,

            toggleSelectedElements,
            rowIsSelectable,

            checkable,
            hideColumns,
            onRowSelect,
            isArray,
            detailTemplateOpenOnRowSelect,
            selectedKey,
            filterRow,
            filterOpenDetailTemplate
        } = props;

        let columnArray = [];
        let key;

        if (dataSource instanceof Array) {
            dataSource.map((element, index) => {

                let columnProps = {
                    element: element,
                    columns: columns,
                    detailTemplate: detailTemplate,
                    toggleSelectedElements: toggleSelectedElements,
                    detailTemplateOpenAll: detailTemplateOpenAll,
                    detailTemplateToggleSelectedElements: detailTemplateToggleSelectedElements,
                    detailTemplateSelectedElements: detailTemplateSelectedElements,
                    detailTemplateHideToggle: detailTemplateHideToggle,
                    rowIsSelectable: rowIsSelectable,
                    selectedElements: selectedElements,
                    checkable: checkable,
                    hideColumns: hideColumns,
                    onRowSelect,
                    index: index,
                    isArray: isArray,
                    detailTemplateOpenOnRowSelect: detailTemplateOpenOnRowSelect,
                    selectedKey: selectedKey,
                    filterOpenDetailTemplate: filterOpenDetailTemplate
                }
                if (typeof element === 'string' || typeof element === 'number') {
                    key = element;
                } else {
                    if (!element['_uniqueId']) {
                        Object.defineProperty(element, '_uniqueId', {
                            configurable: true,
                            enumerable: false,
                            writable: true,
                            value: Math.floor(Math.random() * 100000)
                        });
                    }

                    key = element['_uniqueId'];
                }
                let keySelectable = key + '_selectable';
                let keyDetail = key + '_detail';
                let filteredElement;

                filterRow ? filteredElement = filterRow(element) : filteredElement = false; 
                if (filteredElement === false) {
                    columnArray.push(
                        [
                            [<TableRow key={key} {...columnProps} />],
                            [selectedElements.length > 0 ? <TableSelectable key={keySelectable} {...columnProps} /> : null],
                            [<TableDetail key={keyDetail} {...columnProps} />]
                        ]
                    )
                } else return null;
            })
        }

        return (
            <tbody>
                {columnArray}            
            </tbody>
        )
    }
}