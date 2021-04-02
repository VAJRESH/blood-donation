import React, { Component } from 'react';
import axios from 'axios';
import '../Style/form-style.css';

import { getFormattedDate } from '../../../helper/functions';

// form component which takes required user entry and saves it to the database when submitted.
// I used class component because its setState() function has the ability to update a single entry and update will be merged with original state 
// needs to be refactored as it has too much code
export default class FormComponent extends Component{
    constructor(props){
        super(props);
        this.id = props.match.params.id;

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.generateErrorMessage = this.generateErrorMessage.bind(this);
        // can't think of any alternative for this much key, that why working with this now, do update if you find anything better
        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            dob: '2000-01-01',
            gender: 'Male',
            weight: '',
            phoneNumber: '',
            email: '',
            address: '',
            landmark: '',
            city: '',
            pinCode: '',
            donationDate: '',
            bloodGroup: 'A+',
            amount: 0,
            database: '',
            errorMessage: {
                firstName: false,
                middleName: false,
                lastName: false,
                dob: false,
                gender: false,
                weight: false,
                phoneNumber: false,
                email: false,
                address: false,
                landmark: false,
                city: false,
                pinCode: false,
                bloodGroup: false,
                donationDate: false,
                amount: false,
            }
        }
    }
    // this array is for dropdown used in the form
    bloodGroupArray = [
        'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
    ]
    donationAmount = [ 250, 500, 750, 1000 ]
    // used to display error messages when the conditions are not met, parameter takes the event because it can be used to update the fields
    generateErrorMessage(eventTarget){
        const [field, value] = [eventTarget.name, eventTarget.value];

        const errorMessage = this.state.errorMessage;
        // single object which can be used to apply conditions instead of using multiple if else statements
        const errorObj = {
            weight: {
                condition: value < 20 || value > 200,
                message: 'enter valid weight'
            },
            phoneNumber: {
                condition: value.length !== 10 || value === '',
                message: 'enter valid phone number'
            },
            email: {
                condition: !value.includes('@'),
                message: 'enter valid email'    
            },
            address: {
                condition: value.length < 5,
                message: 'enter valid address'
            },
            city: {
                condition: value.includes(' '),
                message: 'space are not allowed use "-"'
            },
            pinCode:{
                condition: value.length !== 6 || value.charAt(0) === '0',
                message: 'enter valid pin code'
            }
        }
        
        // general validator for first, middle and last name
        if(field.includes('Name')){
            errorObj[field] = {
                condition: value.length < 3,
                message: 'not 3 character long'
            };
        }
        // make the input border green for every field whose value has been changed
        eventTarget.parentNode.children[1].style.borderColor = 'green';
        
        // validator using the above obj conditions which pops up error message and makes the input border red
        if(errorObj[field]){
            if(errorObj[field].condition){
                errorMessage[field] = errorObj[field].message;
                eventTarget.parentNode.children[1].style.borderColor = 'red';
                
                this.setState({
                    errorMessage: errorMessage 
                });
            } else{
                errorMessage[field] = false;
                this.setState({
                    errorMessage: errorMessage 
                });
            }
        }
        // since I used a general validator earlier(above) middle name(if changed) gets affected and shows error until validated, 
        // since the field is not compulsory, the pop up message should disappear when no value is entered.
        if(field === 'middleName' && value.length === 0){
            errorMessage[field] = false;
            eventTarget.parentNode.children[1].style.borderColor = '';
            this.setState({
                errorMessage: errorMessage 
            });
        }
    }
    // captures and updates the state and validates the change in input box
    handleChange(e){
        const updateState = {};
        if(e.target.name === 'city' && e.target.value.includes('ombiv')){
            e.target.value = 'Dombivli';
        }
        updateState[e.target.name] = e.target.value;
        this.setState(updateState);

        this.generateErrorMessage(e.target);
    }
    // submits the value to the back end
    onSubmit(e){
        this.setState({
            database: 'Loading'
        })
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
            address: this.state.address,
            landmark: this.state.landmark,
            city: this.state.city,
            pinCode: this.state.pinCode,
            bloodGroup: this.state.bloodGroup,
            donationDate: this.state.donationDate,
            donationAmount: this.state.amount,
        }

        if(Object.values(this.state.errorMessage).every(value => value === false)){
            axios.post('/donor/add', info)
                .then(res => this.setState({
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dob: '2000-01-01',
                    gender: 'Male',
                    weight: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    landmark: '',
                    city: '',
                    pinCode: '',
                    donationDate: '',
                    bloodGroup: 'A+',
                    amount: 0,
                    database: res.data.message
                }))
                .catch(err => console.log(err));
        }
        setTimeout(() => {
            this.setState({
                database: ''
            })
        }, 5000);
    }
    // pop up box for invalid data entries
    errorBox(message){
        return <div className='errorBox'>{message}</div>;
    }
    render(){
        return(
            <div className='formContainer'>
                {
                    this.state.database !== '' &&
                    <section id='messageBox'>
                        {this.state.database}
                    </section>
                }
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <h1>Blood Donor Details</h1>
                        <section className='formSection'>
                            <div>
                                <label>First Name: *</label>
                                <input
                                name='firstName' type='text'
                                placeholder='John'
                                className='formInput'
                                id='smallWidth'
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                required />
                                { this.state.errorMessage.firstName && this.errorBox(this.state.errorMessage.firstName)}
                            </div>
                            <div>
                                <label>Middle Name: </label>
                                <input
                                name='middleName' type='text'
                                placeholder='Stuart'
                                className='formInput'
                                id='smallWidth'
                                value={this.state.middleName}
                                onChange={this.handleChange} />
                                { this.state.errorMessage.middleName && this.errorBox(this.state.errorMessage.middleName)}
                            </div>
                            <div>
                                <label>Last Name: *</label>
                                <input
                                name='lastName' type='text'
                                placeholder='Doe'
                                className='formInput'
                                id='smallWidth'
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                required />
                                { this.state.errorMessage.lastName && this.errorBox(this.state.errorMessage.lastName)}
                            </div>
                        </section>

                        <section className='formSection'>
                            <div>
                                <label>Date Of Birth: *</label>
                                <input
                                name='dob' type='date'
                                className='formInput'
                                id='smallWidth'
                                max={getFormattedDate()}
                                value={this.state.dob}
                                placeholder='Donation'
                                onChange={this.handleChange}
                                required />
                                { this.state.errorMessage.dob && this.errorBox(this.state.errorMessage.dob)}
                            </div>
                            <div>
                                <label>Gender: *</label>
                                <select
                                    name='gender' 
                                    onChange={this.handleChange} 
                                    className='formInput'
                                    id='smallWidth'
                                    required >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                { this.state.errorMessage.gender && this.errorBox(this.state.errorMessage.gender)}
                            </div>
                            <div>
                                <label>Weight: *</label>
                                <input
                                name='weight' type='number'
                                min='40'
                                max='200'
                                placeholder='60'
                                className='formInput'
                                id='smallWidth'
                                value={this.state.weight}
                                onChange={this.handleChange}
                                required />
                                { this.state.errorMessage.weight && this.errorBox(this.state.errorMessage.weight)}
                            </div>
                        </section>
                        
                        
                        <section className='formSection'>
                            <div>
                                <label>Phone Number: *</label>
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
                                { this.state.errorMessage.phoneNumber && this.errorBox(this.state.errorMessage.phoneNumber)}
                            </div>
                            <div>
                                <label>Email: *</label>
                                <input
                                name='email' type='email'
                                placeholder='johndoe@gmail.com'
                                className='formInput'
                                value={this.state.email}
                                onChange={this.handleChange}
                                required />
                                { this.state.errorMessage.email && this.errorBox(this.state.errorMessage.email)}
                            </div>
                        </section>

                        <section className='formSection'>
                            <div>
                                <label>Address: *</label>
                                <textarea
                                    name='address'
                                    placeholder='201/A, Regency'
                                    className='formInput'
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    required >
                                </textarea>
                                { this.state.errorMessage.address && this.errorBox(this.state.errorMessage.address)}
                            </div>
                        </section>

                        <section className='formSection'>
                            <div>
                                <label>Landmark:</label>
                                <input
                                name='landmark' type='text'
                                className='formInput'
                                placeholder='Opp. DNS Bank'
                                value={this.state.landmark}
                                onChange={this.handleChange} />
                                { this.state.errorMessage.landmark && this.errorBox(this.state.errorMessage.landmark)}
                            </div>
                            <div>
                                <label>City: *</label>
                                <input
                                name='city' type='text'
                                className='formInput'
                                placeholder='Dombivli'
                                value={this.state.city}
                                onChange={this.handleChange} 
                                required />
                                { this.state.errorMessage.city && this.errorBox(this.state.errorMessage.city)}
                            </div>
                            <div>
                                <label>Pin Code:</label>
                                <input
                                name='pinCode' type='number'
                                className='formInput'
                                placeholder='421201'
                                value={this.state.pinCode}
                                onChange={this.handleChange}
                                required />
                                { this.state.errorMessage.pinCode && this.errorBox(this.state.errorMessage.pinCode)}
                            </div>
                        </section>

                        <section className='formSection'>
                            <div>
                                <label>Blood Donation Date:</label>
                                <input
                                name='donationDate' type='date'
                                className='formInput'
                                max={getFormattedDate()}
                                value={this.state.donationDate}
                                onChange={this.handleChange} />
                                { this.state.errorMessage.donationDate && this.errorBox(this.state.errorMessage.donationDate)}
                            </div>
                            <div>
                                <label>Blood Group: *</label>
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
                                { this.state.errorMessage.bloodGroup && this.errorBox(this.state.errorMessage.bloodGroup)}
                            </div>
                            <div>
                                <label>Amount:</label>
                                <select name='amount' onChange={this.handleChange} value={this.state.amount} className='formInput'>
                                    {this.donationAmount.map(value => (
                                        <option key={value} value={value}>{value}</option>
                                        ))}
                                </select>
                                { this.state.errorMessage.amount && this.errorBox(this.state.errorMessage.amount)}
                            </div>
                        </section>

                        <section className='formSection'>
                            <input
                                value='Submit'
                                type='submit' />
                        </section>
                    </fieldset>
                </form>
            </div>
        )
    }
} 