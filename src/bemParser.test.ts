import { bemParser } from './bemParser'
import { BEM } from '../tests/basicSample.scss.json'

const keysContained = [
  'Button',
  'Button__text',
  'Button--primary',
]

describe('BemParser', () => {
  const result = bemParser(BEM);

  keysContained.forEach(val => {
    const contained = `${val}: ${val}`
    it(`The result contain "${contained}"`, () => {
      expect(result).toContain(contained)
    })
  })

})


