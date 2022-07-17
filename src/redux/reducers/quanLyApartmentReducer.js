const stateDefault = {
    arrApartment: [],
}

export const quanLyApartmentReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'LAY_DANH_SACH_APARTMENT': {
            state.arrApartment = action.arrApartment;
            return { ...state };
        }
        default: return state;
    }
}