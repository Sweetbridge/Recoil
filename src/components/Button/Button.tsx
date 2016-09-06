import * as React from 'react';
import * as classNames from 'classnames';
import {findDOMNode} from 'react-dom';
import Selectable from '../Selectable/Selectable';
import './Button.less';
import * as smooth from 'smoothscroll-polyfill';

smooth.polyfill();

function scrollTo(target, offset) {
    let node = window.document.querySelector('#'+target);
    // let offsetElement = window.document.querySelector('#'+target+'-offset')

    node.scrollIntoView({behavior: "smooth"});
}

export interface IButtonProps {
  active?: boolean;
  disabled?: boolean;
  block?: boolean;
  className? : string;
  theme?: 'success' | 'primary' | 'error' | 'default';
  icon? : string;
  href?: string;
  target?: string;
  simple? : boolean;
  strech? : boolean;
  children? : boolean;
  pointer? : 'left' | 'right' | boolean;
  right? : boolean;
  left? : boolean;
  size? : 'small' | 'medium' | 'large' | 'xlarge';
  submit? : boolean;
  style? : any;
  checked? : boolean;
  onClick? : (event: React.MouseEvent) => void;
  tabIndex? : number;
  progressiveClick? : any;
  advanced?: boolean;
  iconPointer? : 'left' | 'right' | 'up' | 'down';
  loading?: boolean;
  iconLocation?: 'left' | 'right';
  checkedTheme? : 'primary' | 'success' | 'error';
  outline? : boolean;
  fill? : boolean;
  scrollToId? : any;
  scrollOffset? : any;
  scrollDuration? : number;
}

export interface IButtonState {
  checked? : boolean;
  progressiveClickIndex? : number;
  progressiveClickLength? : number;
  clickCounter? : number;
  shiftCounter? : number;
}

export default class Button extends React.Component<IButtonProps, IButtonState>{
  
  public static defaultProps = {
      active: true,
      disabled: false,
      block: false,
      advanced: false,
      iconLocation : 'left',
      scrollDuration: 300,
      scrollOffset: 0
  };

  constructor(props: IButtonProps) {
    super(props);
    this.state = {
      checked : false,
      progressiveClickIndex: 0,
      clickCounter: 0,
      shiftCounter: 0
    };
  }

  public componentDidMount() {
    const self = this;
    const props = self.props;
    if (props.progressiveClick) {
      this.setState({
        progressiveClickLength: props.progressiveClick.length
      })
    }


    // if (props.scrollOffset) {
    //       var c = document.createDocumentFragment();
    //       let offsetElement = document.createElement("h1");
    //       let node = window.document.querySelector('#'+props.scrollToId);
    //       offsetElement.id = props.scrollToId+'-offset';
    //       offsetElement.style.top = props.scrollOffset;
    //       offsetElement.appendChild(document.createTextNode('New div'));
    //       c.appendChild(offsetElement)
    //       node.appendChild(c);
    // }


  }

  public onClick(event: React.MouseEvent) {
    const self = this;
    if (this.props.onClick) {
      this.props.onClick(event);
      this.setState({
        checked : true
      });
    }
  }

  public progressiveClick (arrayOfFunctions) {
    const self = this;
    const array = this.props.progressiveClick;
    let state = self.state;
    let clickIndex = state.progressiveClickIndex;
    let arrayLength = state.progressiveClickLength;

    if (clickIndex < arrayLength) {
      array[clickIndex]();
      self.setState({
        progressiveClickIndex: clickIndex + 1
      })
    } else {
      array[0]();
      self.setState({
        progressiveClickIndex: 1
      })
    }
  }

  scrollTo() {
    	scrollTo(this.props.scrollToId, this.props.scrollOffset);
  }

  render() {

    const self = this;
    const props = self.props;

    let buttonType;

    let buttonClass = classNames(
      'r-Button',
      {'simple' : (props.simple)},
      {'outline' : (props.outline)},
      {'block' : (props.block)},
      {'column' : (props.strech)},
      {'icon' : (!props.children)},
      {'button-pointer-right' :(props.pointer === 'right')},
      {'button-pointer-left' :(props.pointer === 'left')},
      {'icon-right' :(props.iconLocation === 'right')},
      {'icon-left' :(props.iconLocation === 'left')},
      {'pull-right' :(props.right)},
      {'pull-left' :(props.left)},
      props.size,
      props.theme,
      props.className,
      {'fill': (props.fill)}
    );

    if (props.submit) {
      buttonType = 'submit';
    } else {
      buttonType = 'button';
    }

    let selectablePartial = <Selectable type={props.checkedTheme} checked={props.checked ? true : false}></Selectable>;
    let iconPartial = (props.icon && !props.loading ? <i className={'fa fa-'+props.icon}></i> : null );
    let loadingPartial = (props.loading ? <i className='fa fa-circle-o-notch fa-spin'></i> : null );
    let animatedIcon = (props.iconPointer && !props.loading ? <i className={"icon-pointer fa fa-caret-"+props.iconPointer} ></i> : null );
    let iconWrapperRight = (props.icon && props.iconLocation === 'right' ? <div className={'icon-pointer-'+props.iconPointer+ " ml10 icon-wrapper " + (props.children ? "mr5" : "")}>{iconPartial}{props.iconPointer ? animatedIcon : null}</div> : null);
    let iconWrapperLeft = (props.icon && props.iconLocation === 'left' ? <div className={'icon-pointer-'+props.iconPointer+" icon-wrapper " + (props.children ? "mr5" : "")}>{iconPartial}{props.iconPointer ? animatedIcon : null}</div> : null);

    let linkButton = () => {
      return (
        <a href={props.href} target={props.target} ref="button" tabIndex={props.tabIndex} onClick={props.progressiveClick ? this.progressiveClick.bind(this) : this.onClick.bind(this)} type={buttonType} disabled={props.disabled || props.loading === true} className={buttonClass} style={props.style}>
          {iconWrapperLeft}
          {loadingPartial}
          {props.children}
          {selectablePartial}
          {iconWrapperRight}
        </a>
      )
    }

    let simpleButton = () => {
        return (
          <button ref="button" tabIndex={props.tabIndex} onClick={this.onClick.bind(this)} type={buttonType} disabled={props.disabled || props.loading === true} target={props.target} className={buttonClass} style={props.style}>
            {iconWrapperLeft}
            {loadingPartial}
            {props.children}
            {iconWrapperRight}
          </button>
        );
    }

    let defaultButton = () => {
        return (
          <button ref="button" tabIndex={props.tabIndex} onClick={props.progressiveClick ? this.progressiveClick.bind(this) : this.props.scrollToId ? this.scrollTo.bind(this) : this.props.onClick} type={buttonType} disabled={props.disabled || props.loading === true} target={props.target} className={buttonClass} style={props.style}>
            {iconWrapperLeft}
            {loadingPartial}
            {props.children}
            {selectablePartial}
            {iconWrapperRight}
          </button>
        );
    }

    if (props.href) {
      return linkButton();
    } else {
      return props.advanced ? defaultButton() : simpleButton();
    }

  }
}