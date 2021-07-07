import React from 'react'
import EventSummary from '../../components/EventDetail/EventSummary'
import EventLogistics from '../../components/EventDetail/EventLogistics'
import EventContent from '../../components/EventDetail/EventContent'
import { getEventById, getAllEvents } from '../../helpers/apiUtils'

function EventDetailPage({event}) {

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

export async function getStaticProps(context) {
    const { id } = context.params
    const event = await getEventById(id)
    
    return {
        props: {
            event
        }
    }
}

export async function getStaticPaths(context) {
    const events = await getAllEvents()
    const paths = events.map(event => ({params: { id: event.id }}))
    
    return {
        paths,
        fallback: false,
    }
}

export default EventDetailPage
