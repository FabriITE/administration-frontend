import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    canton: {idCanton: '', canton: ""},
    provincia: {idProvincia: '', provincia: ""},
    tipo: 'TODOS'
}

const filtersSlice = createSlice({
  name: 'cantones',
  initialState,
  reducers: {
    addSelectedCanton (state, action) {
      state.canton.canton = action.payload.canton
      state.canton.idCanton = action.payload.idCanton
    },
    addSelectedProvincia (state, action) {
      state.provincia.provincia = action.payload.provincia
      state.provincia.idProvincia = action.payload.idProvincia
    },
    addSelectedTipo (state, action) {
      state.tipo = action.payload
    },
    setFiltersValues(state, action){
      state.canton = action.payload.canton
      state.provincia = action.payload.provincia
      state.tipo = action.payload.tipo
    }
  }
})

export const { addSelectedCanton, addSelectedProvincia, addSelectedTipo, setFiltersValues } = filtersSlice.actions

export default filtersSlice.reducer