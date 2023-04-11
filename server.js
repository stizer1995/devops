const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const {isEmptyPayload , isInvalidEmail} = require('./Validator')

const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const dbName = 'company_db'
const collName = 'employees'




app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', async function (req, res) {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collName)
    const results = await collection.findOne({ id: 1 })
    client.close()

    response = {}
    if (results !== null) {
        response = {
            name: results.name,
            email: results.email,
            interests: results.interests
        }
    }
    res.send(response)
})

app.post('/update-profile', async function (req, res) {
    const payload = req.body

    if (isEmptyPayload(payload) || isInvalidEmail(payload)) {
        res.status(400).send({ error: "empty payload. couldnt update" })
    } else {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collName)
        payload['id'] = 1
        const updatedValues = { $set: payload }
        await collection.updateOne({ id: 1 }, updatedValues, { upsert: true })
        client.close()
        res.status(200).send({ info: "user profile updated successfully" })


    }
})

app.listen(3000, function () {
    console.log("w")
})

