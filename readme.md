```js
npm i polkadot-middleware
```

So you're using the awesome [polkadot](https://github.com/lukeed/polkadot) server, but you're missing that sweet middleware action – it's a pain to have to compose all those functions yourself, isn't it?

```js
polkadot(
	handleErrors(
		setCacheControl(
			(req, res) => 'Sup dawg'
		)
	)
).listen(8080)

function handleErrors(next) {
	return async(req, res) => {
		try {
			return await next(req, res)
		} catch (err) {
			res.statusCode = 500

			return err.message || err
		}
	}
}

function setCacheControl(next) {
	return async(req, res) => {
		res.setHeader(`Cache-Control`, `public, max-age=` + 3600)
		return next(req, res)
	}
}
```

Well, until TC39 figures out the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator), you can use this library to give yourself that sweet linear middleware experience.

```js
const polkadot = require('polkadot')
const middleware = require('polkadot-middleware')

middleware(
	polkadot,
	handleErrors,
	setCacheControl,
	(req, res) => 'Sup dawg'
).listen(8080)
```

# License

[WTFPL](https://wtfpl2.com)
