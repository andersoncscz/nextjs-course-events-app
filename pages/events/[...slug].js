import React, {useEffect, useState} from 'react'
import Button from '../../components/ui/Button'
import ErrorAlert from '../../components/ui/ErrorAlert'
import EventList from '../../components/events/EventList'
import {useRouter} from 'next/router'
import { BASE_URL } from '../../helpers/apiUtils'
import ResultsTitle from '../../components/events/ResultsTitle'
import useSWR from 'swr'
import Head from 'next/head'

function FilteredEventsPage() {
    const [events, setEvents] = useState([])

    const router = useRouter()
    const filter = router.query.slug
    const {data: loadedEvents, error} = useSWR(`${BASE_URL}/events.json`)
    
    useEffect(() => {
        if (loadedEvents) {
            const transformedEvents = []

            for (const key in loadedEvents) {
               transformedEvents.push({
                   id: key,
                   ...loadedEvents[key]
               })
            }

            setEvents(transformedEvents)
        }
    },[loadedEvents])

    if (!loadedEvents) {
        return <p className="center">Loading...</p>
    }

    const [filteredYear, filteredMonth] = filter
    const numYear = +filteredYear
    const numMonth = +filteredMonth

    let headData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content="A list of filtered events" />
        </Head>          
    )

    function isValidYear() {
        return !isNaN(numYear) && numYear >= 2020 && numYear <= 2030
    }

    function isValidMonth() {
        return !isNaN(numMonth) && numMonth >= 1 && numMonth <= 12
    }

    function hasError() {
        return error
    }

    if (!isValidMonth() || !isValidYear() || hasError()) {
        return (
            <>
                {headData}
                <div className="center">
                    <ErrorAlert>
                        <p>Invalid Filter. Please adjust your values.</p>
                    </ErrorAlert>
                    <Button link={`/events`}>Show All Events</Button>
                </div>
            </>
        )
    }


    const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

    function hasFiltered() {
        return filteredEvents && filteredEvents.length > 0
    }

    if (!hasFiltered()) {
        return (
            <>
                {headData}
                <div className="center">
                    <ErrorAlert>
                        <p>No events found for the event filtered.</p>
                    </ErrorAlert>
                    <Button link={`/events`}>Show All Events</Button>
                </div>
            </>            
        )
    }

    const date = new Date(numYear, numMonth -1)

    return (
        <>
            {headData}       
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    )
}

export default FilteredEventsPage
