import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Account from './Account';

it('renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Account/>)
})