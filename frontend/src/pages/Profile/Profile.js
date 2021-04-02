import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './profile.css';
import Section from '../../components/Section/Section';
import InlineInputEdit from '../../components/Section/InlineInputEdit';
import { sortArray, getAge, getFormattedDate, bloodGroupArray, getLastTwoDates } from '../../helper/functions';


// this class component needs to be refactored, it was too complex at the moment to separate the logic and 
// due date was near so I didn't refactored
// what needs to be done
// separate the logic and UI, reduce the code if possible  
class Profile extends Component {
    constructor(props){
        super(props);
        this.id = props.match.params.id;

        this.state = {
            person:'',
            update: '',
            databaseResponse: '',
            errorMessage: {
                weight: false,
                phoneNumber: false,
                email: false,
                address: false,
                landmark: false,
                city: false,
                pinCode: false,
                donationDate: false,
            },
            isEditOn: props.location.state || false,
            age: 0
        }
        this.donationDates = this.donationDates.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.submitValue = this.submitValue.bind(this);
    }
    componentDidMount(){
        axios.get('/donor/'+this.id)
            .then(res => {
                res.data.donationDate = sortArray(res.data.donationDate)
                
                this.setState({
                    person: res.data,
                    update: res.data
                });
            })
            .catch(err => console.log(err));
    }
    donationDates(){
        if(this.state.person !== ''){
            return (
                // TODO edit value only after enter is press
                getLastTwoDates(this.state.person.donationDate)
                .map((dates, index) => {
                    const lengthOfDateArray = this.state.person.donationDate.length;
                    let arrayIndex = index===0? lengthOfDateArray-1: lengthOfDateArray-2;
                    return (
                        this.state.update.donationDate &&
                        <p key={dates+Math.random()}>
                            <span 
                            name={`donationDate${index}`}
                            className={`inline-text inline-text-${this.state.isEditOn? 'hidden': 'active'}`}
                            >
                                {dates}
                            </span>
                            <input 
                            name={`donationDate${index}`}
                            type='date'
                            onChange={this.handleChange}
                            max={getFormattedDate()}
                            value={getFormattedDate(this.state.update.donationDate[arrayIndex])}
                            className={`input input-${this.state.isEditOn ? 'active' : 'hidden'}`}
                            />
                        </p>
                    );
                })
            )
        }
    }
    handleEdit(e){
        console.log(e.target)
        if(!this.state.isEditOn){
            this.setState({isEditOn: true});
        }
        if(this.state.isEditOn){
            this.submitValue()
            this.setState({isEditOn: false});
        }
    }
    cancelEdit(){
        this.setState({
            isEditOn: false,
            errorMessage: {
                weight: false,
                phoneNumber: false,
                email: false,
                address: false,
                landmark: false,
                city: false,
                pinCode: false,
                donationDate: false,
            }
        })
    }
    handleChange(e){
        console.log(e.target)
        console.log(e.target.value)
        console.log(this.state.person.donationDate)
        const updatedValue = {...this.state.update};
        let key = e.target.name;
        const value = e.target.value;
        const validator = {
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
        console.log('asa')
        const errorMessage = this.state.errorMessage;
        if(validator[key].condition){
            errorMessage[key] = `Not Valid ${key}`;
            this.setState({ errorMessage: errorMessage });
        } else {
            errorMessage[key] = '';
            this.setState({ errorMessage: errorMessage })
        }
        if(key.includes('donationDate')){
            let index = key.endsWith(0)? 0: 1;
            index = index === 0? 
                updatedValue.donationDate.length-1:
                updatedValue.donationDate.length-2; 
            key = key.slice(0, key.length-1);
            updatedValue[key][index] = e.target.value;
        } else {
            updatedValue[key] = e.target.value;
        }
        this.setState({
            update: updatedValue
        });
        console.log(this.state.person.donationDate)
    }
    submitValue(){
        if(!Object.values(this.state.errorMessage).every(value => value === false)){
            this.setState({ databaseResponse: 'Please Enter Valid Details' });
            this.setState({
                errorMessage: {
                    weight: false,
                    phoneNumber: false,
                    email: false,
                    address: false,
                    landmark: false,
                    city: false,
                    pinCode: false,
                    donationDate: false,
                }
            })
            return (
                setTimeout(() => {
                    this.setState({
                        databaseResponse: ''
                    })
                }, 2000)
            )
        }
        const updatedValue = {...this.state.update};
        this.setState({
            person: updatedValue,
        });
        axios.post('/donor/updateDetails/'+this.id, updatedValue)
            .then(res => this.setState({ databaseResponse: res.data.message }))
            .catch(err => console.log(err));
    }
    render() {
        const donorData = [
            {
                name: 'Personal Info',
                data: [
                    {
                        displayValue: {
                            name: 'First Name: ',
                            value: this.state.person.first_name
                        },
                        input: {},
                    },
                    {
                        displayValue: 
                        this.state.person.middle_name? {
                            name: 'Middle Name: ',
                            value: this.state.person.middle_name
                        }: {},
                        input: {},
                    },
                    {
                        displayValue: {
                            name: 'Last Name: ',
                            value: this.state.person.last_name
                        },
                        input: {},
                    },
                    {
                        displayValue: {
                            name: 'Date Of Birth: ',
                            value: getFormattedDate(this.state.person.dateOfBirth)
                        },
                        input: {
                            name: 'dateOfBirth',
                            type: 'date',
                            max: getFormattedDate(),
                            value: getFormattedDate(this.state.update.dateOfBirth)
                        },
                    },
                    {
                        displayValue: {
                            name: 'Age: ',
                            value: getAge(this.state.person.dateOfBirth)
                        }
                    },
                    {
                        displayValue: {
                            name: 'Gender: ',
                            value: this.state.person.gender
                        }, 
                        dropDown: {
                            name: 'gender',
                            value: this.state.update.gender
                        },
                        options: ['Male', 'Female'],
                    },
                    {
                        displayValue: {
                            name: 'Blood Group: ',
                            value: this.state.person.bloodGroup
                        }, 
                        dropDown: {
                            name: 'bloodGroup',
                            value: this.state.update.bloodGroup
                        },
                        options: bloodGroupArray,
                    }, 
                    {
                        displayValue: {
                            name: 'Weight: ',
                            value: this.state.person.weight
                        },
                        input: {
                            name: 'weight',
                            type: 'number',
                            min: '40',
                            max: '200',
                            value: this.state.update.weight
                        },
                        toggleEdit: this.state.isEditOn
                    }
                ]
            },
            {
                name: 'Contact Info',
                data: [
                    {
                        displayValue: {
                            name: 'Email: ',
                            value: this.state.person.email
                        },
                        input: {
                            name: 'email',
                            type: 'email',
                            value: this.state.update.email,
                        },
                        toggleEdit: this.state.isEditOn
                    },
                    {
                        displayValue: {
                            name: 'Address: ',
                            value: this.state.person.address
                        },
                        textarea: {
                            name: 'address',
                            type: 'email',
                            value: this.state.update.address,
                        },
                        toggleEdit: this.state.isEditOn
                    },
                    {
                        displayValue: {
                            name: 'Landmark: ',
                            value: this.state.person.landmark
                        },
                        input: {
                            name: 'landmark',
                            type: 'text',
                            value: this.state.update.landmark,
                        },
                        toggleEdit: this.state.isEditOn
                    },
                    {
                        displayValue: {
                            name: 'City: ',
                            value: this.state.person.city
                        },
                        input: {
                            name: 'city',
                            type: 'text',
                            value: this.state.update.city,
                        },
                        toggleEdit: this.state.isEditOn
                    },
                    {
                        displayValue: {
                            name: 'Pin Code: ',
                            value: this.state.person.pinCode
                        },
                        input: {
                            name: 'pinCode',
                            type: 'number',
                            value: this.state.update.pinCode,
                        },
                        toggleEdit: this.state.isEditOn
                    },
                ]
            },
        ]
        return (
            <div>                
                {
                    this.state.databaseResponse !== '' &&
                    <section id='messageBox'>
                        {this.state.databaseResponse}
                    </section>
                }
                {
                    this.state.update.first_name &&
                    donorData.map((info, index)=> {
                        return (
                            <Section 
                                title={info.name} 
                                key={info.name}
                                onClick={this.editContent}>
                                {
                                    info.data.map(detail => {
                                        return (
                                            <InlineInputEdit
                                                displayValue={detail.displayValue}
                                                input={detail.input}
                                                select={detail.dropDown}
                                                textarea={detail.textarea}
                                                options={detail.options}
                                                toggleEdit={detail.toggleEdit}
                                                handlers={
                                                    detail.toggleEdit !== undefined?
                                                    [this.handleChange]:
                                                    []
                                                }
                                                errorMessage={this.state.errorMessage}
                                                key={detail.displayValue.name || Math.random()}
                                            />
                                        )
                                    })
                                }
                            </Section>
                        )
                    })

                }
                <Section title='Recent Donation Date' >
                    {this.donationDates()}
                    <Link to={`/donation/${this.id}`}>Add New Entry</Link>
                </Section>
                <Section>
                    {
                        this.state.person.donationDate &&
                        <p>
                            {
                                `${this.state.person.first_name} 
                                has donated blood ${this.state.person.donationDate.length} 
                                time${this.state.person.donationDate.length>1?'s': ''} and total
                                ${this.state.person.donationAmount} ml. 
                                `
                            }
                        </p>
                    }
                </Section>
                <button onClick={this.handleEdit}>
                    { this.state.isEditOn? 'Update': 'Edit Profile' }
                </button>
                {
                    this.state.isEditOn &&
                    <button onClick={this.cancelEdit}>Cancel</button>
                }
            </div>
        );
    }
}

export default Profile;