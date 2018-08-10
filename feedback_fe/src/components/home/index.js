import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Employee from '../../employees.json';
import Header from '../header';
import Modal from '../../modal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      employee: {
        value: '',
        label: '',
        email: '',
        project: '',
        openModal: false,
        modalHeader: '',
        modalBody: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.findEmp = this.findEmp.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  findEmp() {
    const empid = this.state.employee.value;
    const emp = Employee.find((value) => {
      return value.value === empid;
    })
    if (emp) {
      console.log('QQQQ');
      window.location.pathname = `/team/${this.state.employee.value}`;
    } else {
      console.log('EEEE');
      this.setState({
        openModal: true,
        modalHeader: 'Warning!!!',
        modalBody: 'Please enter a valid employee id e.g. XI123 / XIC123.'
      })
    }
    console.log('!!!!', emp);
    return true;
  }
  closePopup() {
    this.setState({
      openModal: false
    })
  }
  handleChange(event) {
    this.setState({
      employee: {
        value: event.target.value.toUpperCase()
      }
    });
  }

  render() {
    const { openModal, modalHeader, modalBody } = this.state;
    return (<div>
      <Header />
      <div className='home-container'>
        <div className='home'>Please enter your Employee Code</div>
        <div className="home-input">
          <input type='text' required name='employeeCode' value={this.state.employee.value} placeholder='Emp. Code' onChange={this.handleChange} />
        </div>
      </div>
      {/* <Link to={`/team/${this.state.employee.value}`} > */}
      <button type='button' onClick={this.findEmp}>Let's Go</button>
      {/* </Link> */}
      {openModal && <Modal>
        <div className="modal-container">
          <div className="modal">
            <h2 className="modal-header">
              {modalHeader}
            </h2>
            <div className="modal-body">
              {modalBody}
            </div>
            <div className="modal-footer">
              <div onClick={this.closePopup} className='submit'>Ok</div>
            </div>
          </div>
        </div>
      </Modal>}
    </div>)
  }
}

export default Home;