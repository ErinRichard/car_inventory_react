import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        make: 'honda',
        model: 'accord',
        sale_price: '18000.00',
        // color: 'white',
        // year: '2021',
        mpg: 'city: 30 / highway: 38',
        new_used: 'new'
    } ,
    reducers: {
        // Will alter the state.make, state.model
        chooseMake: (state, action) => { state.make = action.payload }, 
        chooseModel: (state, action) => { state.model = action.payload }
    }
})


// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseMake, chooseModel, } = rootSlice.actions;