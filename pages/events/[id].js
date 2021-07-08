import React from 'react'
import EventSummary from '../../components/EventDetail/EventSummary'
import EventLogistics from '../../components/EventDetail/EventLogistics'
import EventContent from '../../components/EventDetail/EventContent'
import { getEventById, getFeaturedEvents } from '../../helpers/apiUtils'
import Head from 'next/head'

function EventDetailPage({event}) {

    if (!event) {
        return <div className="center">
            <p>Loading...</p>
        </div>
    }

    return (
        <>
        <Head>
            <title>{event.title}</title>
            <meta name="description" content={event.description} />
        </Head>        
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
        },
        revalidate: 30,
    }
}

export async function getStaticPaths(context) {
    const events = await getFeaturedEvents()
    
    const paths = events.map(event => ({
        params: { 
            id: event.id 
        }
    }))
    
    return {
        paths,
        fallback: true,
    }
}

export default EventDetailPage
