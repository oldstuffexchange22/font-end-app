const stateDefault = {
    arrWalletSystem: [],
    arrWalletCharitity: [],
    searchWallet: [],
}
export const quanLyWalletReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LAY_DANH_SACH_WALLETSYSTEM': {
            state.arrWalletSystem = action.arrWalletSystem;
            return { ...state }
        }
        case 'LAY_DANH_SACH_WALLETCHARITITY': {
            state.arrWalletCharitity = action.arrWalletCharitity;
            return { ...state }
        }
        case 'SEARCH_WALLET': {
            state.searchWallet = action.searchWallet;
            return { ...state }
        }

        default: return state;
    }

}