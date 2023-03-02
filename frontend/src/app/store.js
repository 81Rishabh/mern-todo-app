import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/todo/todoSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
})
