import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'
import Login from './Login';

it('renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Login/>)
})

//add snapshot tests of form after styling