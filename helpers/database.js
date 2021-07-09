import {MongoClient} from 'mongodb'

export async function connectToDatabase(databaseName) {
    const client = await MongoClient.connect(`mongodb+srv://NextJSCourse:123mudar@nextjscourse.stwpd.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
    return client
}