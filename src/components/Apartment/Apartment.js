import React, { useState, useEffect, useRef } from 'react';
import { createApartmentAction, layDanhSachApartment } from '../../redux/actions/type/createApartmentAction';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAprtment, editApartmentAction } from '../../redux/actions/type/quanLyApartmentAction';
export default function Apartment (props) {
    const arrApartment = useSelector(rootReducer => rootReducer.quanLyApartmentReducer.arrApartment);
    const editApartment = useSelector(rootReducer => rootReducer.editApartmentReducer);
    const [apartment, setApartment] = useState({ id: '', name: '', description: '', address: '' });
    const handlechangeInput = (e) => {
        let { value, name } = e.target;
        setApartment({
            ...apartment,
            [name]: value
        })
    }
    const dispatch = useDispatch();
    useEffect(() => {
        const action = dispatch(layDanhSachApartment);
        dispatch(action);
    }, []);

    const inputId = useRef(null);
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputAddress = useRef(null);
    // const inputImage = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const changeID = inputId.current.value;
        const changeName = inputName.current.value;
        const changeDescription = inputDescription.current.value;
        const changeAddress = inputAddress.current.value;
        // const changeImage = inputImage.current.value;
        apartment.id = changeID;
        if (changeName === '') {
            apartment.name = inputName.current.placeholder;
        } else {
            apartment.name = changeName;
        }
        if (changeDescription === '') {
            apartment.description = inputDescription.current.placeholder;
        } else {
            apartment.description = changeDescription;
        }
        if (changeAddress === '') {
            apartment.address = inputAddress.current.placeholder;
        } else {
            apartment.address = changeAddress;
        }

        // if (changeImage === '') {
        //     apartment.imageUrl = inputImage.current.placeholder;
        // } else {
        //     apartment.imageUrl = changeImage;
        // }
        console.log(apartment);
        const action = editApartmentAction(apartment);
        alert('Edit Arpatment thành công!!!');
        dispatch(action);
        e.target.reset();
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

                            <a style={{ position: 'absolute', right: '30px', top: '30px', padding: '10px 20px', backgroundColor: 'rgb(0,0,0,0.8)', color: 'white', borderRadius: '10px' }} href='/createaparment'>Create Apartment</a>
                            <div className='col-lg-12'>
                                <div className='d-widget'>
                                    <div className='d-widget-title'>
                                        <h5>All Apartment</h5>
                                    </div>
                                    <table className='table table-default all-events table-striped table-responsive-lg'>
                                        <thead>
                                            <tr>
                                                <th>Number</th>

                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Address</th>
                                                <th>Image</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {arrApartment.map((task, index) => {
                                                return <tr key={index}>
                                                    <td>{index++}</td>
                                                    <td>{task.name}</td>
                                                    <td>{task.description}</td>
                                                    <td>{task.address}</td>
                                                    <td><img src={task.imageUrl} style={{ width: '200px' }} /></td>
                                                    <td>
                                                        <button className="button soft-danger"><i className="icofont-trash" onClick={() => {
                                                            if (window.confirm('Are sure want to delete?')) {
                                                                const action = deleteAprtment(task.id);
                                                                dispatch(action);
                                                            }
                                                        }}></i></button>

                                                        <button className='btn  btn-outline-success' data-toggle="modal" data-target="#modelId" onClick={() => {
                                                            const action = {
                                                                type: 'XEM_CHI_TIET_APARTMENT',
                                                                xemChiTietApartment: task,
                                                            }
                                                            dispatch(action);
                                                        }}><i className="icofont-pen-alt-1" ></i></button>
                                                    </td>
                                                </tr>

                                            })}


                                        </tbody>
                                    </table>
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
                                                <h3 className='text-center mb-3'>Edit Apartment</h3>
                                                <form className=" mb-3" onSubmit={handleSubmit}>
                                                    <div className='form-group'>
                                                        <input ref={inputId} onChange={handlechangeInput} type='hidden' name='id' className="form-control" value={editApartment.id} />
                                                    </div>
                                                    <div className='form-group'>
                                                        <h5>Name:</h5>
                                                        <input ref={inputName} onChange={handlechangeInput} name='name' className="form-control" placeholder={editApartment.name} />
                                                    </div>
                                                    <div className='form-group'>
                                                        <h5>Description:</h5>
                                                        <input ref={inputDescription} onChange={handlechangeInput} name='description' className="form-control" placeholder={editApartment.description} />
                                                    </div>
                                                    <div className='form-group'>
                                                        <h5>Address:</h5>
                                                        <input ref={inputAddress} onChange={handlechangeInput} name='address' className="form-control" placeholder={editApartment.address} />
                                                    </div>
                                                    {/* <div className='form-group'>
                                                    <h5>Image:</h5>
                                                    <input ref={inputImage} onChange={handlechangeInput} name='imageUrl' className="form-control" placeholder={editApartment.imageUrl} />
                                                </div> */}

                                                    <button type="submit" className="btn btn-primary" >Save</button>
                                                    <button type="reset" className="btn btn-danger ml-3" >Reset</button>
                                                </form>


                                            </div>
                                        </div>
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
