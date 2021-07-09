import classes from './NewsLetterRegistration.module.css';
import {useRef, useContext} from 'react'
import NotificationContext from '../../store/NotificationContext'


function NewsletterRegistration() {
  const emailInputRef = useRef()
  const notificationContext = useContext(NotificationContext)
  const { showNotification } = notificationContext


  function registrationHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending'
    })

    fetch('/api/newsLetter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then(data => {
        throw new Error(data.message ?? 'Something went wrong.')
      })
    })
    .then(data => {
      showNotification({
        title: 'Success',
        message: 'Successfuly registered for newsletter.',
        status: 'success' 
      })
    })
    .catch(error => {
      showNotification({
        title: 'Error',
        message: error.message ?? 'Something went wrong.',
        status: 'error' 
      })
    })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
