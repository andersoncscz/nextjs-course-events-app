function isEmailValid(email) {
    return email && email.includes('@')
}

function validateRequestBody(body) {
    if (!isEmailValid(body.email)) {
        throw new Error({
            message: 'email invalid'
        })
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            validateRequestBody(req.body)
            
            console.log('Request Body is valid. Save in Database')

            res.status(201).json({
                message: 'It works'
            })

        } catch (error) {
            res.status(422).json(error)
        }
    }
}