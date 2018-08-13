import React from 'react';
import ReactDOM from 'react-dom';
import loaderImg from './dnaLoader.svg';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const loader = <div className="loader-container">
      <div>
        <img src={loaderImg} alt="Loader..."/>
        </div>
    </div>;
    return ReactDOM.createPortal(
      loader,
      document.getElementById('loader-root')
    );
  }
}