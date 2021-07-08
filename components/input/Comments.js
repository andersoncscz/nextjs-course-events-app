import { useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
      .then(response => response.json())
      .then(data => setComments(data.comments))
    }
  },[eventId, showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
    .then(response => response.json())
    .then(newComment => {
      setComments((prevComments) => [...prevComments,newComment])
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
