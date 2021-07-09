import {connectToDatabase} from '../../../helpers/database'

function isEmailValid(email) {
    return email && email.includes('@')
}

function isNameValid(name) {
    return name && name.length > 3
}

function isCommentValid(comment) {
    return comment && comment.length > 5
}



function validateRequestBody(body, res) {
    const {email, name, text} = body

    if (!isEmailValid(email)) {
        res.status(500).json({
            message: 'Invalid email.'
        })        
    }

    if (!isNameValid(name)) {
        res.status(500).json({
            message: 'Invalid name. Name must have more than 3 characteres.'
        })
    }

    if (!isCommentValid(text)) {
        res.status(500).json({
            message: 'Invalid comment. Comment must have more than 5 characteres.'
        })
    }
}

async function saveNewComment(comment, eventId, res) {
    const client = await connectToDatabase('events')

    try {
        const newComment = {
            eventId,
            ...comment
        }

        const db = client.db()
        const result = await db.collection('comments').insertOne(newComment)
        const newCommentSaved = await db.collection('comments').findOne({
            _id: result.ops[0]._id
        }) 
        await client.close()

        return newCommentSaved

    } catch (error) {
        await client.close()

        res.status(500).json({
            message: `Error trying to create a new comment.`
        })
    }
}

async function getComments(eventId, res) {
    const client = await connectToDatabase('events')
    try {
        const db = client.db()
        const comments = await db.collection('comments')
            .find({ eventId})
            .sort({_id: -1})
            .toArray()
        await client.close()
    
        return {
            comments
        }
    } catch (error) {
        await client.close()

        res.status(500).json({
            message: `Error trying to get a list of comments.`
        })
    }
}

export default async function handler(req, res) {
    const eventId = req.query.id
    
    try {
        if(req.method === 'POST') {
            validateRequestBody(req.body, res)
                
            const newComment = await saveNewComment(req.body, eventId, res)
            
            res.status(201).json(newComment)
        }
    
        else {
            const comments = await getComments(eventId, res)
    
            res.status(200).json(comments)  
        }
    } catch (error) {
        console.log(error)
    }
}