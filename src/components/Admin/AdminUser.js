import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserAction, editUserAction, quanLyUserAction, searchUserAction } from '../../redux/actions/type/quanLyUserAction';

export default function AdminUser (props) {
    const arrUser = useSelector(rootReducer => rootReducer.quanLyUserReducer.arrUser);
    const searchUser = useSelector(rootReducer => rootReducer.quanLyUserReducer.searchUser);
    const editUserReducer = useSelector(rootReducer => rootReducer.editUserReducer);
    const [user, setUser] = useState({ id: '', name: '', email: '', image: '', buildingId: '', status: '', roleId: '', phone: '', gender: '' });
    const [search, setSearch] = useState({ searchId: '' });
    const dispatch = useDispatch();
    const handleChangeInput = (e) => {
        let { name, value, option } = e.target;
        setUser({
            ...user,
            [name]: value,

        })
    }
    const handleChangeSearch = (e) => {

        let { name, value } = e.target;
        setSearch({
            ...search,
            [name]: value,
        })
    }

    useEffect(() => {
        const action = dispatch(quanLyUserAction);
        dispatch(action);
    }, [])

    let inputUserID = useRef(null);
    let inputUserName = useRef(null);
    let inputUserEmail = useRef(null);
    let inputUserImage = useRef(null);
    let inputUserBuildingId = useRef(null);
    let inputStatus = useRef(null);
    let inputUserRole = useRef(null);
    let inputPhone = useRef(null);
    let inputCreatedAt = useRef(null);
    let inputGender = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        let userId = inputUserID.current.value;
        let userName = inputUserName.current.value;
        let userEmail = inputUserEmail.current.value;
        let userBuilding = inputUserBuildingId.current.value;
        let userImage = inputUserImage.current.value;
        let userStatus = inputStatus.current.value;
        let userRole = inputUserRole.current.value;
        let userPhone = inputPhone.current.value;
        let userGender = inputGender.current.value;

        user.id = userId;
        if (userName === '') {
            user.name = inputUserName.current.placeholder;
        } else {
            user.name = userName;
        }
        if (userEmail === '') {
            user.email = inputUserEmail.current.placeholder;
        } else {
            user.email = userEmail;
        }
        if (userImage === '') {
            user.image = inputUserImage.current.placeholder;
        } else {
            user.image = userImage;
        }
        user.buildingId = userBuilding;
        user.status = userStatus;
        if (userPhone === '') {
            user.phone = inputPhone.current.placeholder;
        } else {
            user.phone = userPhone;
        }
        if (userRole === '') {
            user.roleId = inputUserRole.current.placeholder;
        } else {
            user.roleId = userRole;
        }
        user.gender = userGender;
        const action = editUserAction(user);
        dispatch(action);
        e.target.reset();
        alert('Cập nhật  thành công!!!')
    }
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        const action = searchUserAction(search.searchId);
        dispatch(action);

        console.log(searchUser);
    }

    if (localStorage.getItem('login') === 'admin') {
        return (
            <div>
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
                                <div onSubmit={handleSubmitSearch} className="container mb-4">
                                    <form onSubmit={handleSubmitSearch} style={{ display: 'flex', position: 'absolute', right: '30px', marginBottom: '30px' }} >
                                        <select onChange={handleChangeSearch} id="searchId" name="searchId" >
                                            {arrUser.filter(a => a.status === 'ACTIVE' && a.role.name === "RESIDENT").map((item, index) => {
                                                return <option value={item.email} key={index}>{item.email}</option>
                                            })}
                                        </select><button type="submit" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" >
                                            <i className="icofont-search" />
                                        </button>
                                    </form>
                                </div>
                                <div className="modal fade " id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                    <div className="modal-dialog col-md-12" role="document" >
                                        <div className="modal-content  " style={{ width: '670px', marginTop: '100px', marginRight: '300px' }}  >
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Search Buildng</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body" style={{ display: 'block' }} >
                                                <table className="table table-default all-events table-striped table-responsive-lg" style={{ padding: '10px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th>UserName</th>
                                                            <th>Image</th>
                                                            <th>Phone</th>
                                                            <th>Gender</th>
                                                            <th>Building Name</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {searchUser.map((item, index) => {
                                                            return <tr key={index}>
                                                                <td>{item.userName}</td>
                                                                <td><img src={item.imageUrl} /></td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.gender}</td>
                                                                <td>{item.building.name}</td>
                                                                <td>
                                                                    <button className="button soft-danger"><i className="icofont-trash" onClick={() => {
                                                                        const action = deleteUserAction(item.id);
                                                                        dispatch(action);
                                                                        alert('Delete thành công!!!')
                                                                    }}></i></button>
                                                                    <div className="button soft-primary" data-toggle="modal" data-target="#modelId" onClick={() => {
                                                                        const action = {
                                                                            type: 'XEM_CHI_TIET_USER',
                                                                            userClick: item,
                                                                        }
                                                                        dispatch(action);

                                                                    }}><i className="icofont-pen-alt-1"></i></div>
                                                                </td>
                                                            </tr>

                                                        })}


                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Send message</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-content">
                                    <div className='row merged20 mb-4'>
                                        <div className='col-lg-12'>
                                            <div className='d-widget'>
                                                <div className='d-widget-title'>
                                                    <h5>All User</h5>
                                                </div>
                                                <table className='table table-default all-events table-striped table-responsive-lg'>
                                                    <thead>
                                                        <tr>
                                                            <th>Number</th>
                                                            <th>ID#</th>
                                                            <th>User Name</th>
                                                            <th>Full Name</th>
                                                            <th>Image</th>
                                                            <th>Phone</th>
                                                            <th>Email</th>
                                                            <th>Status</th>
                                                            <th>Gender</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {arrUser.filter(sp => sp.role.name === 'RESIDENT' && sp.status === 'ACTIVE').map((task, index) => {
                                                            return <tr key={index}>
                                                                <td>{index++}</td>
                                                                <td>{task.id}</td>
                                                                <td>{task.userName}</td>
                                                                <td>{task.fullName}</td>
                                                                <td><img src={task.imageUrl} /></td>
                                                                <td>{task.phone}</td>
                                                                <td>{task.email}</td>
                                                                <td>{task.status}</td>
                                                                <td>{task.gender}</td>
                                                                <td>
                                                                    <button className="button soft-danger"><i className="icofont-trash" onClick={() => {
                                                                        if (window.confirm('Are sure want to delete?')) {
                                                                            const action = deleteUserAction(task.id);
                                                                            dispatch(action);
                                                                            alert('Delete thành công!!!')
                                                                        }
                                                                    }}></i></button>
                                                                    <div className="button soft-primary" data-toggle="modal" data-target="#modelId" onClick={() => {
                                                                        const action = {
                                                                            type: 'XEM_CHI_TIET_USER',
                                                                            userClick: task,
                                                                        }
                                                                        dispatch(action);

                                                                    }}><i className="icofont-pen-alt-1"></i></div>
                                                                </td>
                                                            </tr>

                                                        })}

                                                    </tbody>
                                                </table>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
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
                                        <h3 className='text-center mb-3'>Edit User</h3>
                                        <form className=" mb-3" onSubmit={handleSubmit} >

                                            <div className='form-group'>
                                                <input type='hidden' ref={inputUserID} onChange={handleChangeInput} id='id' name='id' className="form-control" placeholder={editUserReducer.id} value={editUserReducer.id} disabled />
                                            </div>
                                            <div className='form-group'>
                                                <h5>UserName:</h5>
                                                <input ref={inputUserName} onChange={handleChangeInput} id='userName' name='userName' className="form-control" placeholder={editUserReducer.userName} />
                                            </div>
                                            <div className='form-group'>
                                                <h5>Email:</h5>
                                                <input ref={inputUserEmail} onChange={handleChangeInput} id='email' name='email' className="form-control" placeholder={editUserReducer.email} />
                                            </div>
                                            <div className='form-group'>
                                                <h5>Image:</h5>
                                                <input ref={inputUserImage} onChange={handleChangeInput} id='image' name='image' className="form-control" placeholder={editUserReducer.imageUrl} />
                                            </div>
                                            <div className='form-group'>
                                                <input type='hidden' ref={inputUserBuildingId} onChange={handleChangeInput} id='buildingId' name='buildingId' className="form-control" value={editUserReducer.building.id} />
                                            </div>
                                            <div className='form-group'>
                                                <h5>Status:</h5>
                                                <select onChange={handleChangeInput} ref={inputStatus} className="form-control" id='status' name='status'>
                                                    <option value="ACTIVE">ACTIVE</option>
                                                    <option value="INACTIVE">INACTIVE</option>

                                                </select>
                                            </div>
                                            <div className='form-group'>

                                                <input type='hidden' ref={inputUserRole} onChange={handleChangeInput} id='role' name='role' className="form-control" placeholder={editUserReducer.role.id} />
                                            </div>
                                            <div className='form-group'>
                                                <h5>Phone:</h5>
                                                <input ref={inputPhone} onChange={handleChangeInput} id='phone' name='phone' className="form-control" placeholder={editUserReducer.phone} />
                                            </div>
                                            <div className='form-group'>
                                                <h5>Gender:</h5>
                                                <select ref={inputGender} onChange={handleChangeInput} className="form-control" id='gender' name='gender'>
                                                    <option value="MALE">MALE</option>
                                                    <option value="FEMALE">FEMALE</option>
                                                    <option value="OTHER">OTHER</option>
                                                </select>
                                            </div>

                                            <button type="submit" className="btn btn-primary" >Save</button>
                                            <button type="reset" className="btn btn-danger ml-3" >Reset</button>
                                        </form>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    alert('Bạn Không đủ quyền truy cập');
    props.history.push('/')

}
