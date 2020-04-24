import React from 'react';
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
                    High-Low generates a random number for you between 1 and 100.  All you have to do is guess if the next number it generates will be higher or lower!  You have 3 minutes to decide.
                    </p>
                </section>
                <section className='landing_section'>
                    <h3>Place your bet</h3>
                    <div className='right placeholder'>Placeholder for wagering screenshot</div>  
                    <p className='landing_paragraph'>
                    Wager points as you guess high or low on each new number. You can change your wager as many times as you want, as long as the clock is still ticking! When the timer hits 0, you'll see the next number and find out if you win or lose!
                    </p>
                </section>
                <section className='landing_section'>
                    <h3>Rake in the points</h3>
                    <div className='left placeholder'>Placeholder for account screenshot</div>
                    <p className='landing_paragraph'>
                    Try to get as many points as you can!  If you hit a string of unlucky guesses and need more points, you can top up your account on the Account page!
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