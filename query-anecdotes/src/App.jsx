import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests' 
import NotificationContext from './NotificationContext'
import { useContext } from 'react'


const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: (changedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['ancedotes'])
      queryClient.setQueryData(['ancedotes'], anecdotes.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote))
      dispatch({type: 'VOTE', payload: changedAnecdote.content})
      setTimeout(() => dispatch({type: 'RESET'}),5000)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['ancedotes'],
    queryFn: getAnecdotes, 
    retry: false,
    refetchOnWindowFocus: false
  })

  if( result.isPending ) {
    return <div>loading data...</div>
  }

  if( result.isError ) {
    return <div>ancedote service not available due to problems in server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
