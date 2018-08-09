import React, { PureComponent } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Header from '../header';
import Modal from '../../modal';
import Plus from '../../../src/plus.svg';
import Employees from '../../../src/employees.json';
import RenderForm from '../renderForm';
import axios from 'axios';

class Team extends PureComponent {
    constructor(props) {
        super(props);
        this.props = props;
        console.log(this.props.match.params.id);
        const empid = this.props.match.params.id;
        console.log(Employees);
        const emp = Employees.find((value) => {
            return value.value === empid;
        });
        const countProjects = Employees.filter(item => {
            return item.value !== empid && item.project == emp.project;
        });
        const options = Employees.filter(item => {
            const notIncluded = ['Support', 'Sales', 'Management'].includes(item.project);
            return (
                (item.value !== empid && countProjects.length < 6 && !notIncluded) ||
                (item.value !== empid && item.project == emp.project && !notIncluded)
            );
        });
        console.log(options);
        this.state = {
            feedbackToAdd: 0,
            feedbacks: [],
            emp,
            options,
            selectedLabel: '',
            title: '',
            openModal: false,
            modalHeader: '',
            modalBody: ''
        }
        this.repeat = this.repeat.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.generateForm = this.generateForm.bind(this);
        this.createFeedback = this.createFeedback.bind(this);
        this.nameSelected = this.nameSelected.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }
    closePopup() {
        this.setState({
            openModal: false
        })
    }
    nameSelected(selectedLabel, index) {
        if (this.state.feedbacks.length > index) {
            this.state.feedbacks[index].label = selectedLabel;
        } else {
            this.setState({ selectedLabel });
        }
    }
    handleOnChange(title, index) {
        if (this.state.feedbacks.length > index) {
            this.state.feedbacks[index].title = title;
        } else {
            this.setState({ title });
        }
    }
    createFeedback() {
        if (this.state.selectedLabel && this.state.title) {
            const feedback = {
                from: this.state.emp.label,
                project: this.state.emp.project,
                to: this.state.selectedLabel,
                title: this.state.title
            }
            this.setState({
                feedbacks: [...this.state.feedbacks, feedback]
            }, () => {
                axios.post('https://thawing-anchorage-33986.herokuapp.com/feedback', {
                    data: this.state.feedbacks
                  })
                  .then(() => {
                    window.location.pathname = `/leadership/${this.state.emp.value}`;
                    // localStorage.setItem("peerReview", JSON.stringify(this.state.feedbacks));
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            })
        } else {
            this.setState({
                openModal: true,
                modalHeader: 'Warning!!!',
                modalBody: 'Please select an employee and give a title for him/her.'
            })
        }
    }
    generateForm(index) {
        const forms = [];
        for (let i = 1; i <= index; i++) {
            forms.push(<RenderForm options={this.state.options} index={i} handleOnChange={this.handleOnChange} nameSelected={this.nameSelected} />);
        }
        return forms;
    }
    repeat() {
        if (this.state.selectedLabel && this.state.title) {
            let i = this.state.feedbackToAdd;
            const options = this.state.options.filter(item => {
                return item.label !== this.state.selectedLabel;
            });
            this.setState({ feedbackToAdd: i + 1, options });
            const feedback = {
                from: this.state.emp.label,
                project: this.state.emp.project,
                to: this.state.selectedLabel,
                title: this.state.title
            }
            this.setState({
                feedbacks: [...this.state.feedbacks, feedback],
                selectedLabel: null,
                title: null
            })
        } else {
            this.setState({
                openModal: true,
                modalHeader: 'Warning!!!',
                modalBody: 'Please select an employee and give a title for him/her.'
            })
        }
    }
    render() {
        const { openModal, modalHeader, modalBody } = this.state;
        return (
            <div>
                <Header user={this.state.emp.label} />
                <div className='body'>
                    <h2 className="page-header">{this.state.emp.project}</h2>
                    <RenderForm options={this.state.options} index={0} handleOnChange={this.handleOnChange} nameSelected={this.nameSelected} />
                    {this.generateForm(this.state.feedbackToAdd)}
                    <div className='submit-button'>
                        <div className="submit" onClick={this.repeat}>Add a new Feedback</div>
                        <div onClick={this.createFeedback} className='submit'>Go to Next Page</div>
                    </div>
                </div>
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
            </div>
        )
    }
}

export default Team;