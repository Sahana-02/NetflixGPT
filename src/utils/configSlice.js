import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'lang',
  initialState: {
    langkey: 'en'
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.langkey = action.payload
    }
  }
})

export const { changeLanguage } = configSlice.actions
export default configSlice.reducer
