const stateDefault = { id: '', title: '', description: '', price: 0, expired: '', status: '', imageUrl: '' };

export const editPostReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'XEM_CHI_TIET_POST': {
            state = action.xemChiTietPost;
            return { ...state }
        }

        default: return state;
    }
}