const express = require('express');
const router = express.Router();

const secretPassword = "m295"

router.post('/login', function (request, response) {
	const { email, password } = request.body

    if (secretPassword == password) {
        request.session.email = email
        return response.status(200).send(`Successfully logged on to ${email}!`)
    }

  return response.status(401).json({ error: "Invalid credentials" })
})

router.get('/verify', function (request, response) {

	if (request.session.email) {
		return response.status(200).send(`You are logged on to ${request.session.email}!`)
	}

  return response.status(401).json({ error: "Not logged in" })
})

router.delete('/logout', function (request, response) {

	if (request.session.email) {
		request.session.email = null
		return response.sendStatus(200)
	}

  return response.status(401).json({ error: "Not logged in" })
})

module.exports = router;