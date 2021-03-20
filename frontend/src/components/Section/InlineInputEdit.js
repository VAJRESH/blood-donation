import React from 'react';

const InlineInputEdit = function (props){
    let [inputOption, name, onClick] = [null, null, null];
    if(props.input){
        name = props.input.name;
        onClick=props.handlers[2];
        inputOption = (
            <input
                name={name}
                type={props.input.type}
                min={props.input.min || null}
                max={props.input.max || null}
                ref={e => e && e.focus()}
                onChange={props.handlers[0]}
                onFocus={props.handlers[1]}
                onBlur={props.handlers[2]}
                value={props.input.value}
                className={`input input-${props.toggleEdit? 'active': 'hidden'}`}
            />
        )
    } else if(props.select) {
        name = props.select.name;
        onClick=props.handlers[2];
        inputOption = (
            <select
                name={name}
                ref={e => e && e.focus()}
                onChange={props.handlers[0]}
                onFocus={props.handlers[1]}
                onBlur={props.handlers[2]}
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
        onClick=props.handlers[2];
        inputOption = (
            <textarea
                name={name}
                rows='2'
                cols='50'
                ref={e => e && e.focus()}
                onChange={props.handlers[0]}
                onFocus={props.handlers[1]}
                onBlur={props.handlers[2]}
                className={`input input-${props.toggleEdit? 'active': 'hidden'}`} 
                value={props.textarea.value} >
            </textarea>
        )
    }
    return (
        <p>
            <strong>{props.displayValue.name}</strong>
            <span 
                name={name}
                className={`inline-text inline-text-${props.toggleEdit? 'hidden': 'active'}`}
                onClick={onClick}
                >
                    {props.displayValue.value}
            </span>
            {inputOption}
        </p>
    )
}

export default InlineInputEdit;