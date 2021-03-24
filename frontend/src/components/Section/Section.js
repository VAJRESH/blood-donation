import React from 'react';

const Section = function (props){
    return (
        <section className='profile-section'>
            <h2>
                {props.title}
                {
                    props.title &&
                    <button name={props.name} onClick={props.onClick}>Edit</button>
                }
            </h2>
            {props.children}
        </section>
    )
}

export default Section;