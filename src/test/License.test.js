import React from 'react'
import License from '../components/License'
import * as data from './test-data'
import './setup';
import renderer from 'react-test-renderer'


describe('License component', () => {
    const license = data.licenses[0];
    const onchange = jest.fn();
    it('renders correctly',() => { 
        const tree = renderer.create(<License name={license.key} onChange={onchange}/>).toJSON();
        expect(tree).toMatchSnapshot()
       })
})


