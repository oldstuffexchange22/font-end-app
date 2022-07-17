const stateDefault = { id: '', userName: '', email: '', image: '', building: '', status: '', role: '', phone: '', gender: '' }

export const editUserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'XEM_CHI_TIET_USER': {
            state = action.userClick;
            return { ...state }
        }
        default: return state
    }
}