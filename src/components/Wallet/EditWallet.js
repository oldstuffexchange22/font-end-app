import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quanLyUserAction } from '../../redux/actions/type/quanLyUserAction';

export default function EditWallet (props) {
    const arrUser = useSelector(rootReducer => rootReducer.quanLyUserReducer.arrUser);
    const searchWallet = useSelector(rootReducer => rootReducer.quanLyWalletReducer.searchWallet);
    const editWallet = useSelector(rootReducer => rootReducer.editWalletReducer);
    const dispatch = useDispatch();
    console.log(editWallet);
    useEffect(() => {
        const action = dispatch(quanLyUserAction);
        dispatch(action);
    }, []);

    if (localStorage.getItem('login') === 'admin') {
        return (
            <div className="theme-layout">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="sidemenu">
                                <i>
                                    <svg
                                        id="side-menu"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={26}
                                        height={26}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-menu"
                                    >
                                        <line x1={3} y1={12} x2={21} y2={12} />
                                        <line x1={3} y1={6} x2={21} y2={6} />
                                        <line x1={3} y1={18} x2={21} y2={18} />
                                    </svg>
                                </i>
                            </div>
                            <div>
                                <p>a:{editWallet.id}</p>
                                <p> ab :{editWallet.balance}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    alert('Bạn Không đủ quyền truy cập');
    props.history.push('/')
}
