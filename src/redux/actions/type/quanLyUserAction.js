import axios from "axios";

export const quanLyUserAction = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/users?pageNumber=1&pageSize=100',
                method: 'GET',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })
            const action = {
                type: 'LAY_DANH_SACH_USER',
                arrUser: result.data.data,
            }
            dispatch(action)
        } catch (error) {
            console.log(error.data);
        }
    }
}

export const deleteUserAction = (name) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/users/' + name,
                method: 'DELETE',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })
            const action = quanLyUserAction();
            dispatch(action);
        } catch (error) {
            console.log(error.data);
        }
    }
}


export const editUserAction = (name) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/users',
                method: 'PUT',
                data: name,
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            });
            const action = quanLyUserAction();
            dispatch(action);
        } catch (error) {

        }
    }
}

export const searchUserAction = (a) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/users?email=' + a + '&pageNumber=1&pageSize=100',
                method: 'GET',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            });
            const action = {
                type: 'SEARCH_DANH_SACH_USER',
                searchUser: result.data.data,
            }
            dispatch(action);
            const action1 = quanLyUserAction();
            dispatch(action1);
        } catch (error) {

        }
    }
}