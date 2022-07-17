const stateDefault = { id: '', balance: '', type: '', currency: '', status: '', desription: '', userId: '' };


export const editWalletReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'XEM_CHI_TIET_WALLET': {
            state = action.xemChiTietWallet;
            return { ...state }
        }
        default: return state;
    }
}