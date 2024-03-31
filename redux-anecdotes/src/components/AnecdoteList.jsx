import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => { 
  const anecdotes = useSelector(state => state.anecdote.filter(anecdote => anecdote.content.includes(state.filter)))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 10))
  } 

  return (
  <div>
  {anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )}
  </div>)
}

export default AnecdoteList