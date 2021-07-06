import React from 'react'
import EventSummary from '../../components/EventDetail/EventSummary'
import EventLogistics from '../../components/EventDetail/EventLogistics'
import EventContent from '../../components/EventDetail/EventContent'
import {useRouter} from 'next/router'
import { getEventById } from '../../dummy-data'

function EventDetailPage() {

    const router = useRouter()
    const id = router.query.id
    const event = getEventById(id)

    if (!event) {
        return <p>No event found</p>
    }

    return (
        <>
         <EventSummary title={event.title}/>
         <EventLogistics date={event.date} 
            address={event.location} 
            image={event.image} 
            imageAlt={event.title} />
         <EventContent>
             <p>{event.description}</p>
         </EventContent> 
        </>
    )
}

export default EventDetailPage
