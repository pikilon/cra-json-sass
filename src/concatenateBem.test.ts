import { concatenateBem } from './concatenateBem'

const TEST_BLOCK = 'Button'

const BEMexample: BemDictionaryType = {
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

  it(`should have an ${TEST_BLOCK} element`, () => {
    expect(resultBlock.block).toEqual(TEST_BLOCK)
  })

  exampleKeys.forEach(blockKey => {
    const elementResult = resultBlock.block + testingBlock[blockKey]
    it(`It should concatenate a ${resultBlock.block} + ${testingBlock[blockKey]}`, () => {
      expect(resultBlock[blockKey]).toEqual(elementResult)
    })

  })


})
