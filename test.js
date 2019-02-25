const test = require(`zora`)
const middleware = require(`./`)

test(`basic functionality`, t => {
	let middleFunctionWasCalled = false
	const initialInput = {}
	const secondFunctionReturn = {}

	middleware(
		next => {
			t.notOk(middleFunctionWasCalled)
			t.equal(next(), secondFunctionReturn)
			t.ok(middleFunctionWasCalled)
		},
		next => () => {
			middleFunctionWasCalled = true
			t.equal(next(), initialInput, `Was passed the initial input`)
			return secondFunctionReturn
		},
		() => initialInput
	)
})
