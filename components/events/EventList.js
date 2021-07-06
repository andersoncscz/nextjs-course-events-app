import React from 'react'
import EventItem from '../../components/events/EventItem'
import classes from './EventList.module.css'

function EventList({items}) {

    return (
        <ul className={classes.list}>
            {items.map(event => {
                const {id, title, location, date, image} = event
                return (
                    <EventItem 
                        key={id} id={id} 
                        title={title}
                        location={location} 
                        date={date}
                        image={image} />
                )
            })}
        </ul>
    )
}

export default EventList
