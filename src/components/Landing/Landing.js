import React from 'react';
import { Button } from '../Utils/Utils';
import { Link } from 'react-router-dom';
import NumberScreenshot from './CurrentNumberSS.png';
import WagerScreenshot from './WagerFormSS.png';
import AccountInfo from './AccountInfoSS.png';
import TestUserLogin from './TestUserLoginSS.png';
import './Landing.css';

export default class Landing extends React.Component {
    render() {
        return (
            <div>
                <section className='landing_section'>
                    <h3>Easy to learn</h3>
                    <img src={NumberScreenshot} className='left screenshot odd' alt='a screenshot of the current number being compared'></img>
                    <p className='landing_paragraph'>
                    High-Low generates a random number for you between 1 and 100.  All you have to do is guess if the next number it generates will be higher or lower!  You have one minute to decide.
                    </p>
                </section>
                <section className='landing_section'>
                    <h3>Place your bet</h3>
                    <img src={WagerScreenshot} className='right screenshot-wide' alt='a screenshot of a form'></img>  
                    <p className='landing_paragraph'>
                    Wager points as you guess high or low on each new number. You can change your wager as many times as you want, as long as the clock is still ticking! When the timer hits 0, you'll see the next number and find out if you win or lose!
                    </p>
                </section>
                <section className='landing_section'>
                    <h3>Rake in the points</h3>
                    <img src={AccountInfo} className='left screenshot odd' alt='a screenshot of a username and score'></img>
                    <p className='landing_paragraph'>
                    Try to get as many points as you can!  If you hit a string of unlucky guesses and need more points, you can top up your account on the Account page!
                    </p>
                </section>
                <section className='landing_section'>
                    <h3>Try it out</h3>
                    <img src={TestUserLogin} className='right screenshot' alt='a screenshot of a login form'></img> 
                    <p className='landing_paragraph'>
                    Want to try it out?  We've set up a demo account for you!  Simply click on the "Log In" button in the header above and enter the User Name 'TestUser' with the Password 'D4m0Pass!' to try things out.
                    </p>
                </section>
                <section className='signupsection'>
                    <h3>Sound like fun?</h3>
                    <Link to='/signup' className='signupa'>
                        <Button className='signupa'>Sign Up</Button>
                    </Link>
                </section>
            </div>
        )
    };
};