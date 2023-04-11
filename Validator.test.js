const {isInvalidEmail} = require('./Validator')
const {isEmptyPayload} = require('./Validator')

test('valid email', function() {
    const testPayload = {
        name: "test name",
        email: "test.email@gmail.com",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(false)
})
test('invalid email', function() {
    const testPayload = {
        name: "test name",
        email: "test.emailgmail.com",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true)
})

test('empty payload', function() {
    const testPayload = {}
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(true)
})
test('non-empty payload', function() {
    const testPayload = {
        name: "test name",
        email: "test.email@gmail.com",
        interests: "testing"
    }
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(false)
})