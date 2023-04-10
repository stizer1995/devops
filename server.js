const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const dbName = 'company_db'
const collName = 'employees'




app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', async function (req, res) {
    const response = {
        name: "sobhan",
        email: "stizer1374@gmail.com",
        interests: "Guitar"
    }

    await client.connect()
    console.log("connected to mongo")

    res.send(response)
})

app.post('/update-profile', async function (req, res) {
    const payload = req.body
    console.log(payload)

    if (Object.keys(payload).length === 0) {
        res.status(400).send({ error: "empty payload. couldnt update" })
    } else {
        await client.connect()
        console.log("connected to mongo")
        const db = client.db(dbName)
        const collection = db.collection(collName)
        payload['id'] = 1
        const updatedValues = { $set: payload}
        await collection.updateOne({id: 1}, updatedValues, {upsert: true })
        client.close()
        res.status(200).send({ info: "user profile updated successfully" })
        

    }
})

app.listen(3000, function () {
    console.log("w")
})

