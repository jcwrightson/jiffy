import React from 'react';
import ReactDOM from 'react-dom';
import Session from './session';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Session />, div);
  ReactDOM.unmountComponentAtNode(div);
});
