"use strict";
const React = require('react');
const Selectable_1 = require('../Selectable/Selectable');
class DropdownWrapper extends React.Component {
    selectItem(item) {
        this.props.selectItem(item);
    }
    render() {
        const self = this;
        const props = self.props;
        let updatedList = [];
        let selectionList = (item, index) => {
            if ((props.type === 'search') && (item.toLowerCase().indexOf(props.filterText.toLowerCase()) > -1) && (props.filterText !== '')) {
                updatedList.push(<div key={index} className="r-DropdownContent__item" onClick={self.selectItem.bind(self, item)}>
            <p>{item}</p>
            <Selectable_1.default checked={(props.selectedItem === item ? true : false)}/>
          </div>);
            }
            else if ((props.type === 'search') && props.filterText === '') {
                return null;
            }
            else if (props.type != 'search') {
                updatedList.push(<div key={index} className="r-DropdownContent__item" onClick={self.selectItem.bind(self, item)}>
            <p>{item}</p>
            <Selectable_1.default checked={(props.selectedItem === item ? true : false)}/>
          </div>);
            }
        };
        return (<div className={props.dropdownWrapperClass}>
        <div className={props.dropdownContentClass}>
            {(() => {
            if (props.children) {
                return (<div>
                    {props.children}
                  </div>);
            }
            else if (props.data) {
                return (<div>
                    {props.data.map(selectionList)}
                    {updatedList}
                  </div>);
            }
            else {
                return null;
            }
        })()}
        </div>
      </div>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DropdownWrapper;