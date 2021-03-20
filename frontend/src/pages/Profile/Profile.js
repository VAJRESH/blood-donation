import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './profile.css';
import Section from '../../components/Section/Section';
import InlineInputEdit from '../../components/Section/InlineInputEdit';
import { sortArray, getAge, getFormattedDate, bloodGroupArray } from '../../helper/functions';

class Profile extends Component {
    constructor(props){
        super(props);
        
        this.id = props.match.params.id;

        this.state = {
            person:'',
            update: '',
            isEditOn: {
                name: false,
                dateOfBirth: false,
                weight: false,
                gender: false,
                email: false,
                phoneNumber: false,
                address: false,
                bloodGroup: false,
                donationDate: [false, false],
            },
            age: 0
        }
        this.donationDates = this.donationDates.bind(this);
        this.editContent = this.editContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEvents = this.handleEvents.bind(this);
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
    getLastTwoDates(array){
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 
            'August', 'September', 'October', 'November', 'December'
        ];
        let i = array.length-1;
        let j = i - 2;
        const displayDates = [];
        for(i; i>j; --i){
            let dateObj = new Date(array[i]);
            let year = dateObj.getFullYear();
            let month = months[dateObj.getMonth()];
            let date = dateObj.getDate();
            if(month){
                displayDates.push(`${year} ${month} ${date}`);
            }
        }
        return displayDates;
    }
    donationDates(){
        if(this.state.person !== ''){
            return (
                this.getLastTwoDates(this.state.person.donationDate)
                .map((dates, index) => {
                    const lengthOfDateArray = this.state.person.donationDate.length;
                    let arrayIndex = index===0? lengthOfDateArray+2: lengthOfDateArray+1;
                    return (
                        this.state.update.donationDate &&
                        <p key={dates+Math.random()}>
                            <span 
                                name={`donationDate${index}`}
                                className={`inline-text inline-text-${this.state.isEditOn.donationDate[index]? 'hidden': 'active'}`}
                                onClick={this.editContent}
                                >
                                    {dates}
                            </span>
                            <input 
                                name={`donationDate${index}`}
                                type='date'
                                ref={e => e && e.focus()}
                                onChange={this.handleChange}
                                onFocus={this.handleEvents}
                                onBlur={this.editContent}
                                max={getFormattedDate()}
                                value={getFormattedDate(this.state.person.donationDate[arrayIndex]) || getFormattedDate()}
                                className={`input input-${this.state.isEditOn.donationDate[index]? 'active': 'hidden'}`}
                                />
                        </p>
                    );
                })
            )
        }
    }
    editContent(e){
        console.log(e.target)
        let updateState = {...this.state}, key = e.target.getAttribute('name');
        if(key.includes('donationDate')){
            let index = key.endsWith(0)? 0: 1;
            key = key.slice(0, key.length-1);
            updateState.isEditOn[key][index] = !this.state.isEditOn[key][index]; 
        } else {
            updateState.isEditOn[key] = !this.state.isEditOn[key]; 
        }
        this.setState(updateState)
    }
    handleChange(e){
        console.log(e)
        console.log(this.state.person.donationDate)
        const updatedValue = {...this.state.update};
        let key = e.target.name;
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
    handleEvents(e){
        e.target.addEventListener('keypress', value => {
            if(value.key === 'Enter'){
                console.log(value.key)
                const updatedValue = {...this.state.update};
                const originalValue = {...this.state.person};
                updatedValue[e.target.name] = e.target.value;
                originalValue[e.target.name] = e.target.value;
                this.setState({
                    person: originalValue,
                }); 
                console.log(updatedValue)
                console.log(this.state.update)
                axios.post('/donor/updateDetails/'+this.id, originalValue)
                    .then(res => console.log(res.data.message))
                    .catch(err => console.log(err));
                    e.target.blur();
                console.log(e.target)
            }
        })
    }
    render() {
        const donorData = [
            {
                name: 'Personal Info',
                data: [
                    {
                        displayValue: {
                            name: 'Name: ',
                            value: this.state.person.name
                        },
                        input: {
                            name: 'name',
                            type: 'text',
                            value: this.state.update.name,
                        },
                        toggleEdit: this.state.isEditOn.name
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
                        toggleEdit: this.state.isEditOn.weight
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
                        toggleEdit: this.state.isEditOn.dateOfBirth
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
                        toggleEdit: this.state.isEditOn.gender
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
                        toggleEdit: this.state.isEditOn.bloodGroup
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
                        toggleEdit: this.state.isEditOn.email
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
                        toggleEdit: this.state.isEditOn.address
                    },
                    {
                        displayValue: {
                            name: 'Phone Number: ',
                            value: this.state.person.phoneNumber
                        },
                        textarea: {
                            name: 'phoneNumber',
                            type: 'number',
                            value: this.state.update.phoneNumber,
                        },
                        toggleEdit: this.state.isEditOn.phoneNumber
                    },
                ]
            }
        ]
        return (
            <div>
                {
                    this.state.update.name &&
                    donorData.map(info => {
                        return (
                            <Section title={info.name} key={info.name}>
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
                                                handlers={[this.handleChange, this.handleEvents, this.editContent]}
                                                key={detail.displayValue.name}
                                            />
                                        )
                                    })
                                }
                            </Section>
                        )
                    })

                }
                <Section title='Donation Date'>
                    {this.donationDates()}
                    <Link to={`/donation/${this.id}`}>Add New Entry</Link>
                </Section>
            </div>
        );
    }
}

export default Profile;