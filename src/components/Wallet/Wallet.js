import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quanLyUserAction, searchUserAction } from '../../redux/actions/type/quanLyUserAction';
import { deleteWallet, editWalletAction, searchWalletAction } from '../../redux/actions/type/quanLyWalletAction';
export default function Wallet (props) {
    const arrUser = useSelector(rootReducer => rootReducer.quanLyUserReducer.arrUser);
    const searchWallet = useSelector(rootReducer => rootReducer.quanLyWalletReducer.searchWallet);
    const editWallet = useSelector(rootReducer => rootReducer.editWalletReducer);
    const dispatch = useDispatch();
    const [user, setUser] = useState({ id: '' });
    const [wallet, setWallet] = useState({ id: '', balance: '', type: '', currency: '', status: '', desription: '', userId: '' })
    const handleChangeInput = (e) => {
        let { value, name } = e.target;
        setUser({
            ...user,
            [name]: value,
        })
    }
    useEffect(() => {
        const action = dispatch(quanLyUserAction);
        dispatch(action);
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const action = searchWalletAction(user.id);
        dispatch(action);
        console.log(action);
    }


    const handleChangeInputEdit = (e) => {
        let { value, name } = e.target;
        setWallet({
            ...wallet,
            [name]: value,
        })
    }


    const inputId = useRef(null);
    const inputBalance = useRef(null);
    const inputType = useRef(null);
    const inputCurrency = useRef(null);
    const inputStatus = useRef(null);
    const inputDescription = useRef(null);
    const inputUserId = useRef(null);
    const handleSubmitEdit = (e) => {
        e.preventDefault();
        let changeId = inputId.current.value;
        let changeBalance = inputBalance.current.value;
        let changeType = inputType.current.value;
        let changeCurrency = inputCurrency.current.value;
        let changeStatus = inputStatus.current.value;
        let changeDescription = inputDescription.current.value;
        let changeUserId = inputUserId.current.value;

        wallet.id = changeId;
        if (changeBalance === '') {
            wallet.balance = inputBalance.current.placeholder;
        } else {
            wallet.balance = changeBalance;
        }
        if (changeType === '') {
            wallet.type = inputType.current.placeholder;
        } else {
            wallet.type = changeType;
        }
        if (changeCurrency === '') {
            wallet.currency = inputCurrency.current.placeholder;
        } else {
            wallet.currency = changeCurrency;
        }
        if (changeStatus === '') {
            wallet.status = inputStatus.current.placeholder;
        } else {
            wallet.status = changeStatus;
        }
        if (changeDescription === '') {
            wallet.desription = inputDescription.current.placeholder;
        } else {
            wallet.desription = changeDescription;
        }
        wallet.userId = changeUserId;

        const action = editWalletAction(wallet);
        dispatch(action);
        console.log(wallet);
        e.target.reset();
        alert('Edit Wallet thành công');

    }
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
                            <div className='container'>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', position: 'absolute', right: '30px', marginBottom: '30px' }}  >
                                    <select onChange={handleChangeInput} name="id" >
                                        {arrUser.filter(sp => sp.role.name === "RESIDENT" && sp.status === 'ACTIVE').map((item, index) => {
                                            return <option key={index} value={item.id}  >{item.userName}</option>
                                        })}
                                    </select>
                                    <button type="submit" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" >
                                        <i className="icofont-search" />
                                    </button>

                                </form>

                            </div>

                            <div className="modal fade " id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                <div className="modal-dialog col-md-12" role="document" >
                                    <div className="modal-content  " style={{ width: '800px', marginTop: '100px', marginRight: '300px' }}  >
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Search Wallet</h5>

                                        </div>
                                        <div className="modal-body" style={{ display: 'block' }} >
                                            <table className="table table-default all-events table-striped table-responsive-lg" style={{ padding: '10px' }}>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>ID</th>
                                                        <th>User Name</th>
                                                        <th>Currency</th>
                                                        <th>Balance</th>
                                                        <th>Type</th>
                                                        <th>Status</th>
                                                        <th>Description</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchWallet.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>{index++}</td>
                                                            <td>{item.id}</td>
                                                            <td>{item.user.userName}</td>
                                                            <td>{item.currency}</td>
                                                            <td>{item.balance}</td>
                                                            <td>{item.type}</td>
                                                            <td>{item.status}</td>
                                                            <td>{item.desription}</td>

                                                            <td><button className='btn btn-outline-success' data-toggle="modal" data-target="#modelId" onClick={() => {
                                                                const action = {
                                                                    type: 'XEM_CHI_TIET_WALLET',
                                                                    xemChiTietWallet: item,
                                                                }
                                                                dispatch(action);
                                                            }} >Xem Chi Tiết</button></td>
                                                        </tr>
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                        <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title"> Edit</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div>
                                                            <h3 className='text-center mb-3'>Edit Wallet</h3>
                                                            <form className=" mb-3" onSubmit={handleSubmitEdit}>
                                                                <div className='form-group'>
                                                                    <input onChange={handleChangeInputEdit} ref={inputId} name='id' type='hidden' className="form-control" value={editWallet.id} />
                                                                </div>
                                                                <div className='form-group'>
                                                                    <h5>Balance:</h5>
                                                                    <input onChange={handleChangeInputEdit} ref={inputBalance} name='balance' className="form-control" placeholder={editWallet.balance} />
                                                                </div>
                                                                <div className='form-group'>
                                                                    <h5>Type:</h5>
                                                                    <input onChange={handleChangeInputEdit} ref={inputType} name='type' className="form-control" placeholder={editWallet.type} />
                                                                </div>
                                                                <div className='form-group'>
                                                                    <h5>Currency:</h5>
                                                                    <input onChange={handleChangeInputEdit} ref={inputCurrency} name='currency' className="form-control" placeholder={editWallet.currency} />
                                                                </div>
                                                                <div className='form-group'>
                                                                    <h5>Status:</h5>
                                                                    <input onChange={handleChangeInputEdit} ref={inputStatus} name='status' className="form-control" placeholder={editWallet.status} />
                                                                </div>
                                                                <div className='form-group'>
                                                                    <h5>Description:</h5>
                                                                    <input onChange={handleChangeInputEdit} ref={inputDescription} name='desription' className="form-control" placeholder={editWallet.desription} />
                                                                </div>
                                                                <div className='form-group'>
                                                                    <input onChange={handleChangeInputEdit} ref={inputUserId} name='userId' type='hidden' className="form-control" value={editWallet.userId} />
                                                                </div>

                                                                <button type="submit" className="btn btn-primary"  >Save</button>
                                                                <button type="reset" className="btn btn-danger ml-3" >Reset</button>
                                                                <button type="button" className="btn btn-secondary ml-3" data-dismiss="modal">Close</button>
                                                            </form>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='container mt-5'>
                                <button className='btn btn-outline-primary w-100'>
                                    <a style={{ fontSize: '25px' }} href='/walletsystem'>Wallet System</a>
                                </button>
                                <button className='mt-5 btn btn-outline-success w-100'>
                                    <a style={{ fontSize: '25px' }} href='/walletcharitity'>Wallet Charitity</a>
                                </button>
                                <button className='mt-5 btn btn-outline-danger w-100'>
                                    <a style={{ fontSize: '25px' }} href='/createwallEt'>Create Wallet</a>
                                </button>
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
