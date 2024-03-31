import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
      appendAnecdote(state, action) {
        state.push(action.payload)
          
      },
      newVote(state, action) {
        const changedAnecdote = action.payload
        return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
  }
})

export const { appendAnecdote, newVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.addLikes(changedAnecdote)
    dispatch(newVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer