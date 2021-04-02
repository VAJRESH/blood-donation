import React from 'react';

const InlineInputEdit = function (props){
    let [inputOption, name] = [null, null];

    if(props.toggleEdit !== undefined){
        if(props.input){
            name = props.input.name;
            inputOption = (
                <input
                    name={name}
                    type={props.input.type}
                    min={props.input.min || null}
                    max={props.input.max || null}
                    onChange={props.handlers[0]}
                    value={props.input.value}
                    className={`input input-${props.toggleEdit? 'active': 'hidden'}`}
                />
            )
        } else if(props.select) {
            name = props.select.name;
            inputOption = (
                <select
                    name={name}
                    onChange={props.handlers[0]}
                    className={`input input-${props.toggleEdit? 'active': 'hidden'}`}
                    value={props.select.value}
                    >
                        {
                            props.options.map(value => {
                                return (
                                    <option value={value} key={value}>{value}</option>
                                )
                            })
                        }
                </select>
            )
        } else if(props.textarea) {
            name = props.textarea.name;
            inputOption = (
                <textarea
                    name={name}
                    rows='2'
                    cols='50'
                    onChange={props.handlers[0]}
                    className={`input input-${props.toggleEdit? 'active': 'hidden'}`} 
                    value={props.textarea.value} >
                </textarea>
            )
        }
    }
    return (
        <section>
            <strong>
                {props.displayValue.name}
            </strong>
            <span 
                name={name}
                className={`inline-text inline-text-${props.toggleEdit? 'hidden': 'active'}`}
                tabIndex={0}
            >
                {props.displayValue.value}
            </span>
            {inputOption}
            {
                props.errorMessage[name] && 
                <div className='errorBox'>{props.errorMessage[name]}</div>
            }
        </section>
    )
}

export default InlineInputEdit;