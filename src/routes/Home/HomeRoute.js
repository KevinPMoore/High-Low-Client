import React from 'react';
import Landing from '../../components/Landing/Landing';
import { Section } from '../../components/Utils/Utils';

export default class Home extends React.Component {
    
    render() {
        return (
            <Section className="landing">
                <Landing />
            </Section>
        ) 
    }
}