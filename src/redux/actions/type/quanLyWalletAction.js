

import axios from "axios";

export const layDanhSachWalletSystem = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/wallets/type/system',
                method: 'GET',
            })
            const action = {
                type: 'LAY_DANH_SACH_WALLETSYSTEM',
                arrWalletSystem: result.data.data,
            }
            dispatch(action);
        } catch (error) {
            console.log(error.data);
        }
    }
}
export const layDanhSachWalletCharitity = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/wallets/type/chairity',
                method: 'GET',
            })
            const action = {
                type: 'LAY_DANH_SACH_WALLETCHARITITY',
                arrWalletCharitity: result.data.data,
            }
            dispatch(action);
        } catch (error) {
            console.log(error.data);
        }
    }
}

export const createWallet = (a) => {
    return async (dispatch) => {
        try {

            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/wallets',
                method: 'POST',
                data: a,
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })

        } catch (error) {
            console.log(error.data);
        }
    }
}

export const searchWalletAction = (e) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/wallets/user/' + e,
                method: 'GET',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })
            const action = {
                type: 'SEARCH_WALLET',
                searchWallet: result.data.data,
            }
            console.log(result.data.data);

            dispatch(action)
        } catch (error) {
            console.log(error.data);
        }
    }

}

export const deleteWallet = (a) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/wallets/' + a,
                method: 'DELETE',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }

            })
        } catch (error) {
            console.log(error.data);
        }
    }
}

export const editWalletAction = (a) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/wallets',
                method: 'PUT',
                data: a,
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })
        } catch (error) {
            console.log(error.data);
        }
    }
}