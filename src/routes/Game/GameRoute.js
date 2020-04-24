import React from 'react';
import Game from '../../components/Game/Game';
import { Section } from '../../components/Utils/Utils';

export default class GameRoute extends React.Component {

    render() {
        return (
            <Section className="game">
                <Game bank={this.props.bank} updateBank={this.props.updateBank}/>
            </Section>
        )
    }
}