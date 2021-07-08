import classes from './NewsLetterRegistration.module.css';
import {useRef} from 'react'

function NewsletterRegistration() {
  const emailInputRef = useRef()

  function registrationHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value

    fetch('/api/newsLetter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
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
