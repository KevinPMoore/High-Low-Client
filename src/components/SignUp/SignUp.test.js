import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'
import SignUp from './SignUp';

it('renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<SignUp/>)
})
