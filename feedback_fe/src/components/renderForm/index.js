import React, { PureComponent } from 'react';
import Dropdown from 'react-select';
import Titles from '../../../src/titles.json';

const titles = Titles;

export default class RenderForm extends PureComponent {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            label: ''
        }
        this.nameSelected = this.nameSelected.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    nameSelected(e) {
        this.setState({
            label: e.label
        })
        this.props.nameSelected(e.label, this.props.index);
        console.log('index', this.props.index);
    }
    handleOnChange(e) {
        console.log('index', this.props.index);
        this.props.handleOnChange(e.target.value, this.props.index);
    }
    render() {
        const { options, index } = this.props;
        return (
            <div key={options.value}>
                <div className='select-user'>
                    <div>Please select a title which you think is appropriate for your team member:</div>
                    <div className='dropdown' key={options.value}><Dropdown options={options} key={options.value} onChange={this.nameSelected} /></div>
                </div>
                <div className='body radio'>
                    {
                        titles.map(item => {
                            return <div className='radioButton'>
                                <input type="radio" required name={`titels_${index}`} value={item} onChange={this.handleOnChange} />
                                <div>{item}</div>
                            </div>
                        })
                    }
                </div>
                <p className="border-bottom" />
            </div>
        )
    }
}