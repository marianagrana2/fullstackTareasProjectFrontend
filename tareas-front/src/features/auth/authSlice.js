import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Obtener del localStorage los datos si es que existen
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user: null,
    isError:false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Registrar Usuario (Funcion reductora)
export const register = createAsyncThunk('auth/register',async(user, thunkAPI) => {
    try {
        return await authService.register(user) // Promesa que devuelve los datos
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Creo el slice
export const authSlice = createSlice ({
    name: 'auth', // Nombre del slice
    initialState,
    reducers: {
        reset: (state) => { // Resetear el state ya que se uso
            state.isLoading = false 
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder // Estados que puede tener la aplicación 
        .addCase(register.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer