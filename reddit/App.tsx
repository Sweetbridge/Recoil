/// <reference path='../typings/main.d.ts'/>

import * as React from 'react';

import Align from '../src/components/Align/Align';
import Button from '../src/components/Button/Button';
import Badge from '../src/components/Badge/Badge';
import Toolbar from '../src/components/Toolbar/Toolbar';
import Checkbox from '../src/components/Checkbox/Checkbox';
import Grid from '../src/components/Grid/Grid';
import Layer from '../src/components/Layer/Layer';
import Dropdown from '../src/components/Dropdown/Dropdown';
import Input from '../src/components/Input/Input';
import Wizard from '../src/components/Wizard/Wizard';
import Modal from '../src/components/Modal/Modal';
import Door from '../src/components/Door/Door';
import Emerge from '../src/components/Emerge/Emerge';
import Pane from '../src/components/Pane/Pane';
import Transform from '../src/components/Transform/Transform';
import Toggle from '../src/components/Toggle/Toggle';
import Avatar from '../src/components/Avatar/Avatar';

import Sampledata from './Sampledata';
import Reverb from './Reverb';

export default class App extends React.Component<any, any> {
  
  constructor() {
    super();
    this.state = {
      mobile: false,
      nightMode: false,
      slideIndex: 0,
      selected: [],
      data: []
    }
  }
  
  componentDidMount() {
    
    let data = new Reverb('https://www.reddit.com/r/worldnews.json');
    
    data.syncState({
        dataSet: 'data.children',
        toState: 'data',
        isArray: true
    });
    
  }
    
  render() {

    const self = this;
    const props = self.props;
    let state = self.state;
    
    
    return (
      <h1>
        Reddit Recoil
      </h1>
    )
    
  }
}