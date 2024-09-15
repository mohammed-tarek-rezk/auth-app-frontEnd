import { configureStore , combineReducers } from '@reduxjs/toolkit'
import { persistReducer ,persistStore} from 'redux-persist'
import userSlice from './slices/userSlice'
import storageSession from 'redux-persist/lib/storage/session'


   
  const authPersistConfig = {
    key: 'auth',
    storage: storageSession,
  }
   
  const rootReducer = combineReducers({
    user: userSlice,
  })
  let presistingReducer = persistReducer(authPersistConfig , rootReducer)
export const store = configureStore({
  reducer: presistingReducer,
})

export let persistor = persistStore(store)