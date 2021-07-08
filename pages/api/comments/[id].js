function isEmailValid(email) {
    return email && email.includes('@')
}

function isNameValid(name) {
    return name && name.length > 3
}

function isCommentValid(comment) {
    return comment && comment.length > 5
}



function validateRequestBody(body) {
    const {email, name, text} = body

    if (!isEmailValid(email)) {
        throw new Error({
            message: 'Invalid email.'
        })
    }

    if (!isNameValid(name)) {
        throw new Error({
            message: 'Invalid name. Name must have more than 3 characteres.'
        })
    }

    if (!isCommentValid(text)) {
        throw new Error({
            message: 'Invalid comment. Comment must have more than 5 characteres.'
        })
    }
}

function registerNewComment(comment) {
    return {
        id: 5,
        ...comment
    }
}

function getComments(eventId) {
    return {
        comments:[{
            id: 1,
            text: 'Comment 1',
            name: 'Anderson'
        }, {
            id: 2,
            text: 'Comment 2',
            name: 'Anderson'
        },{
            id: 3,
            text: 'Comment 3',
            name: 'Anderson'
        },{
            id: 4,
            text: 'Comment 4',
            name: 'Anderson'
        }]
    }
}

export default async function handler(req, res) {
    const eventId = req.query.id
    
    if(req.method === 'POST') {
        try {
            validateRequestBody(req.body)

            const comment = registerNewComment(req.body)

            res.status(201).json(comment) 
        } catch (error) {
            res.status(422).json(error)
        }
    }

    else {
        const comments = getComments(eventId)
        res.status(200).json(comments)
    }
}