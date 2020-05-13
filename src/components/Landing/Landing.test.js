import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'
import Landing from './Landing';

it('renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Landing/>)
})

//add snapshot tests of after styling and correct text overview as needed