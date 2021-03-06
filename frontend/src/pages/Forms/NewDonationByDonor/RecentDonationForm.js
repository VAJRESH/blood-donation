import React, { Component } from 'react';
import axios from 'axios';

import { getFormattedDate } from '../../../helper/functions';

class DonationDate extends Component {
    constructor(props){
        super(props);
        this.id = props.match.params.id;

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            donationDate: getFormattedDate(),
            weight: 60,
            amount: 500
        }
    }
    handleChange(e){
        const key = e.target.getAttribute('name');
        const donorInfo = this.state;
        donorInfo[key] = e.target.value;
        console.log(donorInfo);
        this.setState(donorInfo);
    }
    onSubmit(e){
        e.preventDefault();
        const info = {
            ...this.state,
            userId: this.id
        }

        axios.post('/donor/addDate/'+this.id, info)
            .then(res => console.log(res.data.message))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className='formContainer'>
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>New Blood Donation Date</legend>
                        <section className='formSection'>
                            <div>
                                <label> Blood Donation Date: </label>
                                <input
                                name='donationDate'
                                type='date'
                                className='formInput'
                                max={getFormattedDate()}
                                value={this.state.donationDate}
                                onChange={this.handleChange}
                                required />
                            </div>
                            <div>
                                <label>
                                    Weight:
                                </label>
                                <input
                                name='weight'
                                type='number'
                                min='40'
                                max='200'
                                placeholder='Enter Weight'
                                className='formInput'
                                value={this.state.weight}
                                onChange={this.handleChange}
                                required />
                            </div>
                            <div>
                                <label>
                                    Amount:
                                </label>
                                <select
                                name='amount'
                                className='formInput'
                                value={this.state.amount}
                                onChange={this.handleChange}
                                required>
                                    {[250, 500, 750, 1000].map(value => {
                                        return (
                                            <option key={value}>{value}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </section>
                        <section className='formSection'>
                            <input
                            value='Add New Entry'
                            type='submit' />
                        </section>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default DonationDate;
