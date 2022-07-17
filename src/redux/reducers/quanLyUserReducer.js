const stateDefault = {
    arrUser: [],
    searchUser: [],
};

export const quanLyUserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LAY_DANH_SACH_USER': {
            state.arrUser = action.arrUser;
            return { ...state }
        }
        case 'SEARCH_DANH_SACH_USER': {
            state.searchUser = action.searchUser;
            return { ...state };
        }


        default: return state;
    }
}