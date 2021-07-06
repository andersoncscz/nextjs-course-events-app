import React from 'react'
import {useRouter} from 'next/router'
import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'
import {getAllEvents} from '../../dummy-data'

function AllEventsPage() {
    const events = getAllEvents()
    const router = useRouter()

    function handleFindEvents(year, month) {
        const path = `/events/${year}/${month}`
        router.push(path)
    }

    return (
        <>
            <EventsSearch onSearch={handleFindEvents} />
            <EventList items={events} />
        </>
    )
}

export default AllEventsPage
