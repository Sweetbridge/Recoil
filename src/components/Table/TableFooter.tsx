import * as React from 'react';

import Pager from '../Pager/Pager';
import {IPagerProps} from '../Pager/Pager';

export interface ITableFooterProps extends IPagerProps {}

export default class TableFooter extends React.Component<ITableFooterProps, {}>{
  render() {
    const self = this;
    let props = self.props;
    return (
        <Pager 
          className="p10" 
          {...props} 
        />
    )

  }
}