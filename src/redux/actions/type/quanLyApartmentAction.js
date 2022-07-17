import axios from "axios"
import { layDanhSachApartment } from "./createApartmentAction"

export const deleteAprtment = (a) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/apartments/' + a,
                method: 'DELETE',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })
            const action = layDanhSachApartment();
            dispatch(action);
        } catch (error) {
            console.log(error.data);
        }
    }
}

export const editApartmentAction = (a) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/apartments',
                method: 'PUT',
                data: a,
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })
            const action = layDanhSachApartment();
            dispatch(action);
        } catch (error) {
            console.log(error.data);
        }
    }
}