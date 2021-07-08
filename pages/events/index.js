import React from 'react'
import {useRouter} from 'next/router'
import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'
import {getAllEvents} from '../../helpers/apiUtils'
import Head from 'next/head'

function AllEventsPage({ events }) {
    const router = useRouter()

    function handleFindEvents(year, month) {
        const path = `/events/${year}/${month}`
        router.push(path)
    }

    return (
        <>
            <Head>
                <title>All Events</title>
                <meta name="description" content="Find great events and get envolved" />
            </Head>
            <EventsSearch onSearch={handleFindEvents} />
            <EventList items={events} />
        </>
    )
}

export async function getStaticProps(context) {
    const events = await getAllEvents()

    return {
        props: {
            events,
        },
        revalidate: 60,
    }
}

export default AllEventsPage
