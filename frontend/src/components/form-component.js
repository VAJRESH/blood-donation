import React, { Component } from 'react';
import axios from 'axios';
import '../css/form-style.css';

import { sortArray, getFormattedDate } from '../helper/functions';

const FormSection = function (props){
    return (
        <section className='formSection'>
            <label>{props.label}</label>
            <input
            name={props.input.name}
            type={props.input.type}
            placeholder={props.input.placeholder}
            className='formInput'
            value={props.input.value}
            onChange={props.input.onChange}
            required />
        </section>
    )
}

export default class FormComponent extends Component{
    constructor(props){
        super(props);
        this.id = props.match.params.id;

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            dob: '2000-01-01',
            gender: 'Male',
            weight: '',
            bloodGroup: 'A+',
            donationDate: getFormattedDate(),
            amount: 250,
            phoneNumber: '',
            email: '',
            address: ''
        }
    }
    bloodGroupArray = [
        'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
    ]
    donationAmount = [ 250, 500, 750, 1000 ]
    componentDidMount(){
        if(this.id){
            axios.get('/donor/'+this.id)
                .then(res => {
                    console.log(res.data)
                    res.data.donationDate = sortArray(res.data.donationDate);
                    this.setState({
                        name: res.data.name,
                        dob: getFormattedDate(new Date(res.data.dateOfBirth)),
                        gender: res.data.gender,
                        weight: res.data.weight,
                        bloodGroup: res.data.bloodGroup,
                        donationDate: getFormattedDate(new Date(res.data.donationDate[res.data.donationDate.length-1])),
                        phoneNumber: res.data.phoneNumber,
                        email: res.data.email,
                        address: res.data.address
                    })
                })
        }
    }
    handleChange(e){
        const updateState = {};
        updateState[e.target.name] = e.target.value;
        this.setState(updateState);
    }
    onSubmit(e){
        e.preventDefault();
        const info = {
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dob,
            gender: this.state.gender,
            weight: this.state.weight,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            bloodGroup: this.state.bloodGroup,
            donationDate: this.state.donationDate,
            donationAmount: this.state.amount,
            address: this.state.address
        }
        console.log(info);
        alert(JSON.stringify(info));
        if(this.id){
            axios.post('/donor/updateDetails/'+this.id, info)
                .then(res => console.log(res.data.message))
                .catch(err => console.log(err));
        } else{
            axios.post('/donor/add', info)
                .then(res => console.log(res.data.message))
                .catch(err => console.log(err));
        }
    }
    render(){
        return(
            <div className='formContainer'>
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Blood Donor Details</legend>
                        <section className='formSection'>
                            <div>
                                <label> First Name * </label>
                                <input
                                name='firstName' type='text'
                                placeholder='John'
                                className='formInput'
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                required />
                            </div>
                            <div>
                                <label> Middle Name </label>
                                <input
                                name='middleName' type='text'
                                placeholder='Stuart'
                                className='formInput'
                                value={this.state.middleName}
                                onChange={this.handleChange} />
                            </div>
                            <div>
                                <label> Last Name * </label>
                                <input
                                name='lastName' type='text'
                                placeholder='Doe'
                                className='formInput'
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                required />
                            </div>
                        </section>

                        <section className='formSection'>
                            <div>
                                <label>Date Of Birth * </label>
                                <input
                                name='dob' type='date'
                                className='formInput'
                                max={getFormattedDate()}
                                value={this.state.dob}
                                placeholder='Donation'
                                onChange={this.handleChange}
                                required />
                            </div>
                            <div>
                                <label>Gender *</label>
                                <select
                                    name='gender' 
                                    onChange={this.handleChange} 
                                    className='formInput'
                                    required >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label>Weight *</label>
                                <input
                                name='weight' type='number'
                                min='40'
                                max='200'
                                placeholder='60'
                                className='formInput'
                                value={this.state.weight}
                                onChange={this.handleChange}
                                required />
                            </div>
                        </section>
                        
                        
                        <section className='formSection'>
                            <div>
                                <label>Phone Number *</label>
                                <input
                                name='phoneNumber'
                                min='1000000000'
                                max='10000000000'
                                type='number'
                                placeholder='8845808080'
                                className='formInput'
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                                required />
                            </div>
                            <div>
                                <label>Email *</label>
                                <input
                                name='email' type='email'
                                placeholder='johndoe@gmail.com'
                                className='formInput'
                                value={this.state.email}
                                onChange={this.handleChange}
                                required />
                            </div>
                        </section>

                        
                        <section className='formSection'>
                            <div>
                                <label>Address</label>
                                <textarea
                                    name='address'
                                    placeholder='Arther Street, Bandra'
                                    className='formInput'
                                    value={this.state.address}
                                    onChange={this.handleChange} >
                                </textarea>
                            </div>
                        </section>

                        <section className='formSection'>
                            <div>
                                <label>Blood Donation Date</label>
                                <input
                                name='donationDate' type='date'
                                className='formInput'
                                max={getFormattedDate()}
                                value={this.state.donationDate}
                                onChange={this.handleChange} />
                            </div>
                            <div>
                                <label>Blood Group *</label>
                                <select 
                                    name='bloodGroup' 
                                    onChange={this.handleChange} 
                                    value={this.state.bloodGroup} 
                                    className='formInput'
                                    required>
                                    {this.bloodGroupArray.map(value => (
                                        <option key={value} value={value}>{value}</option>
                                        ))}
                                </select>
                            </div>
                            <div>
                                <label>Amount</label>
                                <select name='amount' onChange={this.handleChange} value={this.state.amount} className='formInput'>
                                    {this.donationAmount.map(value => (
                                        <option key={value} value={value}>{value}</option>
                                        ))}
                                </select>
                            </div>
                        </section>

                        <section className='formSection'>
                            <input
                                value={this.id? 'update': 'submit'}
                                type='submit' />
                        </section>
                    </fieldset>
                </form>
            </div>
        )
    }
} 