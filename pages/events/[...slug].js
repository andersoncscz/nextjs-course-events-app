import React from 'react'
import Button from '../../components/ui/Button'
import ErrorAlert from '../../components/ui/ErrorAlert'
import EventList from '../../components/events/EventList'
import {useRouter} from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import ResultsTitle from '../../components/events/ResultsTitle'

function FilteredEventsPage() {
    const router = useRouter()
    const filteredData = router.query.slug

    if (!filteredData) {
        return <p className="center">Loading...</p>
    }

    const [filteredYear, filteredMonth] = filteredData
    const numYear = +filteredYear
    const numMonth = +filteredMonth

    function isValidYear() {
        return !isNaN(numYear) && numYear >= 2020 && numYear <= 2030
    }

    function isValidMonth() {
        return !isNaN(numMonth) && numMonth >= 1 && numMonth <= 12
    }

    if (!isValidMonth() || !isValidYear()) {
        return (
            <>
                <div className="center">
                    <ErrorAlert>
                        <p>Invalid Filter. Please adjust your values.</p>
                    </ErrorAlert>
                    <Button link={`/events`}>Show All Events</Button>
                </div>
            </>
        )
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    })

    function hasFiltered() {
        return filteredEvents && filteredEvents.length > 0
    }

    if (!hasFiltered()) {
        return (
            <>
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
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    )
}

export default FilteredEventsPage
