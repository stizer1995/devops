const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', function (req, res) {
    const response = {
        name: "sobhan",
        email: "stizer1374@gmail.com",
        interests: "Guitar"
    }
    res.send(response)
})

app.post('/update-profile', function (req, res) {
    const payload = req.body
    console.log(payload)
    if (Object.keys(payload).length === 0) {
        res.status(400).send({ error: "empty payload. couldnt update" })
    } else {
        res.status(200).send({ info: "user profile updated successfully" })
    }
})

app.listen(3000, function () {
    console.log("w")
})

