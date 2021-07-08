import React from 'react'
import {getFeaturedEvents} from '../helpers/apiUtils'
import EventList from '../components/events/EventList'
import NewsletterRegistration from '../components/input/NewsLetterRegistration'
import Head from 'next/head'

function HomePage({ events }) {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content="NextJS Course" />
            </Head>
            <NewsletterRegistration />
            <EventList items={events} />
        </div>
    )
}

export async function getStaticProps(context) {
    const featuredEvents = await getFeaturedEvents()
    
    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800,
    }
}

export default HomePage
