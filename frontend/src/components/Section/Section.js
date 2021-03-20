import React from 'react';

const Section = function (props){
    return (
        <section className='profile-section'>
            <h2>{props.title}</h2>
            {props.children}
        </section>
    )
}

export default Section;