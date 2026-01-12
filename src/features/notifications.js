import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    readNotifications : [],
    unreadNotifications: [],
    notificationsFilter : "unread"
}

const notificationsSlide = createSlice({
    initialState,
    name: "notifications",
    reducers: {
        addNotifications(state, action) {
            state.readNotifications = action.payload.read
            state.unreadNotifications = action.payload.unread
        },
        changeNotificationsFilter(state, action) {
            state.notificationsFilter = action.payload
        }
    }
})

export const { addNotifications, changeNotificationsFilter } = notificationsSlide.actions;
export default notificationsSlide.reducer;