import React from 'react'
import Filter from '../components/Filter'
import * as data from './test-data'
import './setup';
import renderer from 'react-test-renderer'
describe('Filter component', () => {
    const licenses = data.licenses;
    const onchange = jest.fn();
    it('renders correctly',() => { 
        const tree = renderer.create(<Filter licenses={licenses} onChange={onchange}/>).toJSON();
        expect(tree).toMatchSnapshot()
       })
})


