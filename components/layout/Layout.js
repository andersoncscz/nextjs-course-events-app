import React, {useContext} from 'react'
import MainHeader from './MainHeader'
import Notification from '../ui/Notification'
import NotificationContext from '../../store/NotificationContext'

function Layout({children}) {
    const notificationContext = useContext(NotificationContext)
    const { notification } = notificationContext
    
    return (
        <>
            <MainHeader />
            <main>{children}</main>
            {notification && 
                <Notification 
                    title={notification.title} 
                    message={notification.message} 
                    status={notification.status} />
            }
        </>
    )
}

export default Layout
