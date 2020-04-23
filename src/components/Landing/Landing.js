import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default class Landing extends React.Component {
    render() {
        return (
            <div>
                <section className='landing_section'>
                    <h3>Easy to learn</h3>
                    <div className='left placeholder'>Placeholder for number/countdown screenshot</div>
                    <p className='landing_paragraph'>
                    High-Low does the hard part and generates a random number between 1 and 100.  All you have to do is guess if the next number it generates will be higher or lower!
                    </p>
                </section>
                <section className='landing_section'>
                    <h3>Place your bet</h3>
                    <div className='right placeholder'>Placeholder for wagering screenshot</div>  
                    <p className='landing_paragraph'>
                    Wager points as you guess high or low on each new number.  You have until the timer hits 0 to make your wager, and you can change it as many times as you want.
                    </p>
                </section>
                <section className='landing_section'>
                    <h3>Rake in the points</h3>
                    <div className='left placeholder'>Placeholder for comparison screenshot</div>
                    <p className='landing_paragraph'>
                    When the timer hits 0 you'll find out if you guessed right.  Try to get as many points as possible!
                    </p>
                </section>
                <section className='signup'>
                    <h3>Sound like fun?</h3>
                    <Link to='/signup'>
                        <button>Sign Up</button>
                    </Link>
                </section>
            </div>
        )
    }
}