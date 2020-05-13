import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Game from './Game';

it('renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Game/>)
})

//add snapshot tests for Game as DemoUser after styling