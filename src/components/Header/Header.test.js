import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'
import Header from './Header';


it('renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Header/>);
})

//add snapshot tests for logged out and logged in after styling