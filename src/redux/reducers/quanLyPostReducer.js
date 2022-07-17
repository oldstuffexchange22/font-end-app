

const stateDefault = {
    arrPost: [],
    arrSearchPost: [],
};

export const quanLyPostReducer = (state = stateDefault, action) => {
    switch (action.type) {


        case 'LAY_DANH_SACH_POST': {
            state.arrPost = action.arrPost;
            return { ...state };
        }
        case 'SEARCH_POST': {
            state.arrSearchPost = action.arrSearchPost;
            return { ...state };
        }
        default: return state;
    }
}