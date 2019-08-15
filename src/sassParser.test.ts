import { sassParser } from './sassParser'
import json from '../tests/basicSample.scss.json';


describe('Sass Parser', () => {
  const result = sassParser(json)

  it('match snapshot', () => {
    expect(result).toMatchSnapshot()
  })

})
