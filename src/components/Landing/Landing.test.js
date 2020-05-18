import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'
import Landing from './Landing';

it('renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Landing/>)
})
