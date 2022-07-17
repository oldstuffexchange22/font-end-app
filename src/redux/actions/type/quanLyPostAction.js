import axios from "axios";

export const quanLyPostAction = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/posts?page=1&pageSize=100',
                method: 'GET',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })
            const action = {
                type: 'LAY_DANH_SACH_POST',
                arrPost: result.data.data,
            }
            dispatch(action)
        } catch (error) {
            console.log(error.data);
        }
    }
}

export const deletePost = (name) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/posts?id=' + name,
                method: 'DELETE',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            })

            const action = quanLyPostAction();
            dispatch(action);
            const action2 = quanLyPostAction();
            dispatch(action2);
        } catch (error) {
            console.log(error.data);
        }
    }
}
export const searchPostAction = (a) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/posts?status=' + a + '&page=1&pageSize=100',
                method: 'GET',
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            });
            const action = {
                type: 'SEARCH_POST',
                arrSearchPost: result.data.data,
            }
            dispatch(action)
            const action1 = quanLyPostAction();
            dispatch(action1);
        } catch (error) {

        }
    }
}

export const editPostAction = (a) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/v1.0/posts',
                method: 'PUT',
                data: a,
                headers: {
                    ['Authorization']: 'Bearer ' + localStorage.getItem('loginadmin'),
                }
            });
            const action = quanLyPostAction();
            dispatch(action);
        } catch (error) {
            console.log(error.data);
        }
    }
}