import React from 'react'
import {getFeaturedEvents} from '../helpers/apiUtils'
import EventList from '../components/events/EventList'

function HomePage({ events }) {
    return (
        <div>
            <EventList items={events} />
        </div>
    )
}

export async function getStaticProps(context) {
    const featuredEvents = await getFeaturedEvents()
    
    return {
        props: {
            events: featuredEvents,
        }
    }
}

export default HomePage
