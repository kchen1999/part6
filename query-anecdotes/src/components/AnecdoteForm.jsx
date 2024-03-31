import { createAnecdote } from '../requests' 
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['ancedotes'])
      queryClient.setQueryData(['ancedotes'], anecdotes.concat(newAnecdote))
      dispatch({type: 'NEW', payload: newAnecdote.content})
      setTimeout(() => dispatch({type: 'RESET'}),5000)
    },
    onError: () => {
      dispatch({type: 'NEW', payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => dispatch({type: 'RESET'}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
   
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
