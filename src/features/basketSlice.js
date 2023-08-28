import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
    name: 'basket',
    initialState: JSON.parse(localStorage.getItem('basket')) || [],
    reducers: {
        addToBasket: (state, action) => {
            const cardId = action.payload;
            console.log(cardId);
            if (!state.includes(cardId)) {
                state.push(cardId);
                localStorage.setItem('basket', JSON.stringify(state));
            }
        },
        removeFromBasket: (state, action) => {
            const cardId = action.payload;
            const updatedBasket = state.filter(id => id !== cardId);
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
            return updatedBasket;
        },
    },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
