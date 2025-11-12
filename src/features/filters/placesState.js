import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cantones: [],
  provincias: [],
  allCantones: []
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addCantones (state, action) {
      state.cantones = action.payload
    },
    addProvincias(state, action) {
      state.provincias = action.payload
    },
    addAllCantones(state, action){
      state.allCantones = action.payload
    }
  }
})

export const { addCantones, addProvincias, addAllCantones } = placesSlice.actions

export default placesSlice.reducer