import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {},
  reducers: {
    setUser: (state, action)=>{
        return action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer