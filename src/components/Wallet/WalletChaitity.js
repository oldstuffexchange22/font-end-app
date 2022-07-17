import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { layDanhSachWalletCharitity } from '../../redux/actions/type/quanLyWalletAction';
export default function WalletChaitity (props) {
    const dispatch = useDispatch()
    const arrWalletCharitity = useSelector(rootReducer => rootReducer.quanLyWalletReducer.arrWalletCharitity);
    useEffect(() => {
        const action = dispatch(layDanhSachWalletCharitity);
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
                            <div className="col-lg-9">
                                <div className="main-wraper">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <div className="full-book">
                                                <figure>
                                                    <img src="images/resources/product-full.jpg" alt="" />
                                                    <span>Trending</span>
                                                </figure>

                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                            <div className="prod-detail">
                                                <ul className="stars">
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                    <li><i className="icofont-star"></i></li>
                                                </ul>
                                                <h4>WALLET {arrWalletCharitity.type}</h4>
                                                <span>Balance: <i>{arrWalletCharitity.balance}</i></span>
                                                <ul className="item-info">
                                                    <li><span>Currency:</span>{arrWalletCharitity.currency}</li>
                                                    <li><span>Status:</span> {arrWalletCharitity.status}</li>
                                                    <li><span>Create Date:</span>{arrWalletCharitity.createdAt}</li>
                                                    <li><span>LAst Update Date:</span>{arrWalletCharitity.lastUpdatedAt}</li>
                                                </ul>
                                                <span>Description: <i>{arrWalletCharitity.descripton}</i></span>

                                            </div>
                                        </div>
                                    </div>

                                </div>
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
