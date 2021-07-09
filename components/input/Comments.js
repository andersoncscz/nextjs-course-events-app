import { useEffect, useState, useContext } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';
import NotificationContext from '../../store/NotificationContext'


function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([])
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const notificationContext = useContext(NotificationContext)
  const { showNotification } = notificationContext
  
  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true)

      fetch(`/api/comments/${eventId}`)
        .then(response => response.json())
        .then(data => {
          setComments(data.comments)
          setIsFetchingComments(false)
        })
        .catch(error => {
          setIsFetchingComments(false)
        })
    }
  },[eventId, showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: 'Sending...',
      message: 'Registering your comment.',
      status: 'pending'
    })

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then(data => {
        throw new Error(data.message ?? 'Something went wrong.')
      })
    })
    .then(newComment => {
      setComments((prevComments) => [...prevComments,newComment])
      showNotification({
        title: 'Success.',
        message: 'Comment registered successfuly.',
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

  function renderComments() {
    if (isFetchingComments) {
      return <p className="center">Loading...</p>
    }

    if (showComments && comments.length > 0) {
      return <CommentList comments={comments} />
    }

    if (!isFetchingComments && showComments && comments.length === 0) {
      return <p className="center">No comments to show.</p>
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {renderComments()}
    </section>
  );
}

export default Comments;
