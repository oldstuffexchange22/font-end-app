import axios from "axios"

export const createApartmentAction = (a) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/apartments',
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


export const layDanhSachApartment = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/apartments?isBuildingsNull=true',
                method: 'GET',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })
            const action = {
                type: 'LAY_DANH_SACH_APARTMENT',
                arrApartment: result.data.data,
            }
            dispatch(action);
            console.log(result.data.data);
        } catch (error) {
            console.log(error.data);
        }
    }
}