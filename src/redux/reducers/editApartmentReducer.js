const stateDefault = { id: '', name: '', description: '', address: '', imageUrl: '' };

export const editApartmentReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'XEM_CHI_TIET_APARTMENT': {
            state = action.xemChiTietApartment;
            return { ...state };
        }

        default: return state;

    }
}