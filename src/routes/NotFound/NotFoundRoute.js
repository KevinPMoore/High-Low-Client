import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import './NotFoundRoute.css';

export default class NotFoundPage extends Component {
    
  render() {
    return (
      <Section className='notfoundpage'>
        <h2 className='notfoundheader'>404 - Page not found</h2>
        <p className='notfoundp'>Try going back to your previous page.</p>
      </Section>
    );
  };
};