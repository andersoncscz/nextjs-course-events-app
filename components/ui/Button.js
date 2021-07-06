import React from 'react'
import Link from 'next/link'
import classes from './Button.module.css'

function Button({link, onClick, children}) {

    if (link) {
        return (
            <Link classes={classes.btn} href={link}>
                <a className={classes.btn}>{children}</a>
            </Link>
        )
    }

    return (
        <button className={classes.btn} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
