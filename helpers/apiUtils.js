const BASE_URL = 'https://nextjs-course-2e6c5-default-rtdb.firebaseio.com/'

export async function getAllEvents() {
    const response = await fetch(`${BASE_URL}/events.json`)
    const data = await response.json()
    
    const events = []

    for (const key in data) {
        events.push({
            id: key,
            ...data[key]
        })
    }

    return events
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents()
    return allEvents.filter(event => event.isFeatured)
}

export async function getEventById(id) {
    const allEvents = await getAllEvents()
    return allEvents.filter(event => event.id === id)[0] ?? undefined
}