import {connectToDatabase} from '../../helpers/database'

function isEmailValid(email) {
    return email && email.includes('@')
}

function validateRequestBody(body, res) {
    if (!isEmailValid(body.email)) {
        res.status(422).json({
            message: 'Invalid email.'
        })

        throw new Error('validateRequestBody')
    }
}

async function save(email, res) {
    const client = await connectToDatabase('events')
    try {
        const db = client.db()
        await db.collection('emails').insertOne({
            email
        })
        await client.close()
    } catch (error) {
        await client.close()

        res.status(500).json({
            message: 'Error trying to save.'
        })

        throw new Error('save')
    }
}

async function validateUserExists(email, res) {
    const client = await connectToDatabase('events')
    const db = client.db()
    const user = await db.collection('emails').findOne({
        email
    })

    await client.close()

    if (user) {
        res.status(422).json({
            message: 'User alredy exists.'
        })

        throw new Error('validateUserExists')
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            validateRequestBody(req.body, res)
            
            await validateUserExists(req.body.email, res)
            await save(req.body.email, res)
    
            res.status(201).json({
                message: `User ${req.body.email} signed up!`
            })
        } catch (error) {
            console.log(error)
        }
    }
}