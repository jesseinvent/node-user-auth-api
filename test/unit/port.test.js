import { expect } from 'chai'
import serverPort from '../../src/utils/getServerPort.js'

describe("Test environment", () => {

    it("Should get correct port when on test environment", () => {
        expect(serverPort()).to.equal(3001)
    })

})