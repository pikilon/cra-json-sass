import { concatenateBem, BLOCK_KEY } from './concatenateBem'

const TEST_BLOCK = 'Button'

const BEMexample: JsonType = {
  [TEST_BLOCK]: {
    text: "__text",
    icon: "__icon",
    primary: "--primary",
    secondary: "--secondary"
  }
}

describe('Concatenate bem', () => {
  const result = concatenateBem(BEMexample)
  const resultBlock = result[TEST_BLOCK]
  const testingBlock = BEMexample[TEST_BLOCK]
  const exampleKeys = Object.keys(testingBlock)
  const block = resultBlock[BLOCK_KEY];

  it(`should have an ${TEST_BLOCK} element`, () => {
    expect(block).toEqual(TEST_BLOCK)
  })

  exampleKeys.forEach(blockKey => {
    const elementResult = block + testingBlock[blockKey]
    it(`It should concatenate a ${block} + ${testingBlock[blockKey]}`, () => {
      expect(resultBlock[blockKey]).toEqual(elementResult)
    })

  })


})
