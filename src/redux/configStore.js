
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { editApartmentReducer } from './reducers/editApartmentReducer';
import { editBuidingReducer } from './reducers/editBuildingReducer';
import { editPostReducer } from './reducers/editPostReducer';
import { editUserReducer } from './reducers/editUserReducer';
import { editWalletReducer } from './reducers/editWalletReducer';
import { gioHangReducer } from './reducers/gioHangReducer';
import { loginReducer } from './reducers/loginReducer';
import { quanLyApartmentReducer } from './reducers/quanLyApartmentReducer';
import { quanLyBuildingReducer } from './reducers/quanLyBuildingReducer';
import { quanLyPostReducer } from './reducers/quanLyPostReducer';
import { quanLyUserReducer } from './reducers/quanLyUserReducer';
import { quanLyWalletReducer } from './reducers/quanLyWalletReducer';




const rootReducer = combineReducers({
    quanLyBuildingReducer,
    quanLyUserReducer,
    quanLyPostReducer,
    editBuidingReducer,
    loginReducer,
    editUserReducer,
    editPostReducer,
    quanLyApartmentReducer,
    editApartmentReducer,
    quanLyWalletReducer,
    editWalletReducer,
    gioHangReducer,
});

let middleWare = applyMiddleware(reduxThunk);
let composeCustom = compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const store = createStore(rootReducer, composeCustom);