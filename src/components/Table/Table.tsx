import * as React from 'react';
import * as classNames from 'classnames';

import './Table.less';

import TableHead from './TableHead';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableSearch from './TableSearch';
import Layer from '../Layer/Layer';
import Toolbar from '../Toolbar/Toolbar';
import Button from '../Button/Button';
import Emerge from '../Emerge/Emerge';
import Loading from '../Loading/Loading';

import DataSource from '../DataSource/DataSource';

import { IColumn } from './IColumn';
export { IColumn }

export interface ITableProps {
    id?: string;
    // initial dataSource loaded as prop
    dataSource?: Array<Object> | Array<number> | Array<string>;
    // columns defined by user
    columns?: Array<IColumn>;
    // a detail template function that returns a view
    detailTemplate?: (element: Array<Object>) => JSX.Element;
    // toggle if the table header should show
    hideHeader?: boolean;
    // how many rows to show
    pageSize?: number;
    // current page index
    page?: number;
    detailTemplateOnOpen?: (element: Array<Object>) => any;
    // 
    detailTemplateSelectedElements?: Array<Object>;
    selectedElements?: Array<Object>;
    rowIsSelectable?: boolean | 'single' | 'multi';
    checkable?: boolean;
    hideCheckAll?: boolean;
    onCheck?: (event: React.MouseEvent<HTMLInputElement>) => void;
    detailTemplateHideToggle?: boolean;
    hideColumns?: Array<string>;
    onRowSelect?: (element?: Array<Object>, key?: string | number, selectedElements?: Array<Object>, id?: string) => void;
    pageSizerOptions?: Array<number>;
    onPageSizeChange?: (event: React.MouseEvent<HTMLElement>) => void;
    onPageChange?: any;
    sortable?: boolean;
    searchableKeys?: Array<any>;
    searchTitle?: string;
    className?: string;
    detailTemplateOpenOnRowSelect?: boolean | "single";
    rowCount?: number;
    hidePageSize?: boolean;
    onSort?: Function;
    sortType?: "asc" | "desc";
    sortKey?: string;
    showDataSourceLength?: boolean;
    selectedKey?: string;
    flex?: boolean;
    menuTemplate?: any;
    focusOnMount?: any;
    contentMaxHeight?: number;
    filterRow?: any;
    filterOpenDetailTemplate?: any;
    toggleSorting?: any;
    toggleSelectedElements?: any;
    selectAll?: any;
    previousPage?: any;
    nextPage?: any;
    gotoPage?: any;
    firstPage?: any;
    lastPage?: any;
    detailTemplateToggleSelectedElements?: any;
    changePageSize?: any;
    isArray?: any;
    numberOfPages?: any;
    numberPerPage?: any;
    activeRows?: any;
    filteredItems?: any;
    detailTemplateToggleAll?: any;
    searchTerm?: any;
    filterItems?: any;
    title?: string;
    hideFooter?: boolean;
    scrollToId?: any;
    scrollIf?: any;
    loading?: boolean;
    searchValue?: string;
    searchFilter?: any;
    onSearchChange?: (term: string) => void;
}

interface ITableState {

}

class Table extends React.Component<ITableProps, ITableState>{

    public static defaultProps = {
        showDataSourceLength: true,
        title: 'items'
    }

    render() {

        const self = this;
        const props = self.props;

        let {
            searchValue,
            selectedKey,
            filterOpenDetailTemplate,
            filterRow,
            contentMaxHeight,
            menuTemplate,
            detailTemplate,
            showDataSourceLength,
            onSort,
            hidePageSize,
            rowCount,
            sortable,
            detailTemplateOpenOnRowSelect,
            onPageChange,
            hideHeader,
            detailTemplateHideToggle,
            rowIsSelectable,
            checkable,
            hideColumns,
            onRowSelect,
            pageSizerOptions,
            sortType,
            sortKey,
            columns,
            page,
            pageSize,
            detailTemplateSelectedElements,
            selectedElements,
            isArray,
            numberOfPages,
            numberPerPage,
            dataSource,
            activeRows,
            toggleSelectedElements,
            selectAll,
            previousPage,
            nextPage,
            gotoPage,
            firstPage,
            lastPage,
            detailTemplateToggleSelectedElements,
            changePageSize,
            toggleSorting,
            filterItems,
            detailTemplateToggleAll,
            searchTerm,
            title,
            hideFooter,
            scrollToId,
            scrollIf,
            loading,
            hideCheckAll,
            onSearchChange
        } = props;

        // assign the props

        let tableProps = {
            dataSource: rowCount ? dataSource : activeRows,
            columns: columns,
            hideHeader: hideHeader,
            detailTemplate: detailTemplate,
            detailTemplateSelectedElements: detailTemplateSelectedElements,
            selectedElements: selectedElements,
            checkable: checkable,
            detailTemplateHideToggle: detailTemplateHideToggle,
            hideColumns: hideColumns,
            isArray: isArray,
            detailTemplateOpenOnRowSelect: detailTemplateOpenOnRowSelect,
            selectedKey: selectedKey,
            filterRow: filterRow,
            filterOpenDetailTemplate: filterOpenDetailTemplate
        }

        let headProps = {
            detailTemplateToggleAll: detailTemplateToggleAll,
            selectAll: selectAll,
            sortable: sortable,
            toggleSorting: toggleSorting,
            onSort: onSort,
            sortType: sortType,
            sortKey: sortKey,
            hideCheckAll: hideCheckAll
        }

        let bodyProps = {
            rowIsSelectable: rowIsSelectable,
            toggleSelectedElements: toggleSelectedElements,
            detailTemplateToggleSelectedElements: detailTemplateToggleSelectedElements,
            onRowSelect: onRowSelect
        }

        let footerProps = {
            currentPage: page,
            numberOfPages: numberOfPages,
            numberPerPage: numberPerPage,
            nextPage: nextPage,
            previousPage: previousPage,
            firstPage: firstPage,
            gotoPage: gotoPage,
            lastPage: lastPage,
            changePageSize: changePageSize,
            pageSizerOptions: pageSizerOptions,
            dataSource: dataSource,
            pageSize: pageSize,
            onPageChange: onPageChange,
            rowCount: rowCount,
            hidePageSize: hidePageSize,
            hideHeader: hideHeader,
            showDataSourceLength: showDataSourceLength,
            title: title
        }

        let tableSearchProps = {
            filterItems: filterItems,
            searchableKeys: this.props.searchableKeys,
            focusOnMount: this.props.focusOnMount,
            searchTitle: this.props.searchTitle,
            value: searchValue,
            onSearchChange: onSearchChange
        }

        let tableClass = classNames(
            'r-Table',
            { 'e-flex': (props.flex) },
            { 'e-selectable': (!!props.rowIsSelectable) },
            { 'e-selectable': (detailTemplateOpenOnRowSelect === true || detailTemplateOpenOnRowSelect === 'single') },
            props.className
        )

        if (loading) {
            return <Loading />
        }
        else if ((activeRows.length || dataSource.length) && columns.length) {
            let nothingMatchesSearchCriteria = searchTerm !== '' && activeRows.length === 0;
            return (
                <div id={props.id} className={tableClass}>
                    <TableSearch {...tableSearchProps} />
                    {menuTemplate ? menuTemplate() : null}
                    <Layer scroll theme="light" scrollToId={scrollToId} scrollIf={scrollIf} fill style={contentMaxHeight ? { height: contentMaxHeight } : null}>
                        {
                            nothingMatchesSearchCriteria ?
                                <Toolbar block textCenter className="p10 ptb20"><small>Nothing matches search criteria...</small></Toolbar>
                                :
                                <table className="w100" >
                                    <TableHead {...tableProps} {...headProps} />
                                    <TableBody {...tableProps} {...bodyProps} />
                                </table>
                        }
                    </Layer>
                    {nothingMatchesSearchCriteria || hideFooter ? null : <TableFooter {...footerProps} />}
                </div>
            )
        } else {
            return (
                <Emerge className="e-fill">
                    <Toolbar block textCenter className="ptb20">
                        <Button block size="large" simple>No items found</Button>
                    </Toolbar>
                </Emerge>
            )
        }
    }
}

export default DataSource(<Table />);