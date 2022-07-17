import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, editPostAction, quanLyPostAction, searchPostAction } from '../../redux/actions/type/quanLyPostAction';



export default function AdminPost (props) {
    const arrPost = useSelector(rootReducer => rootReducer.quanLyPostReducer.arrPost);
    const arrSearchPost = useSelector(rootReducer => rootReducer.quanLyPostReducer.arrSearchPost);
    const editPost = useSelector(rootReducer => rootReducer.editPostReducer);
    const dispatch = useDispatch();

    const [post, setPost] = useState({ id: '', title: '', description: '', price: 0, expired: '', status: '', imageUrl: '' });
    const [status, setStatus] = useState({ a: 'ACTIVE' });
    const inputId = useRef(null);
    const inputTitle = useRef(null);
    const inputDescription = useRef(null);
    const inputPrice = useRef(0);
    const inputExpired = useRef(null);
    const inputStatus = useRef(null);
    const inputImageUrl = useRef(null);

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        let userId = inputId.current.value;
        let userTitle = inputTitle.current.value;
        let userDescription = inputDescription.current.value;
        let userPrice = inputPrice.current.value;
        let userExpired = inputExpired.current.value;
        let userStatus = inputStatus.current.value;
        let userImage = inputImageUrl.current.value;
        post.id = userId;
        if (userTitle === '') {
            post.title = inputTitle.current.placeholder;

        } else {
            post.title = userTitle;
        }
        if (userDescription === '') {
            post.description = inputDescription.current.placeholder;

        } else {
            post.description = userDescription;
        }
        if (userPrice === '') {
            post.price = inputPrice.current.placeholder;

        } else {
            post.price = userPrice;
        }
        if (userExpired === '') {
            post.expired = inputExpired.current.placeholder;

        } else {
            post.expired = userExpired;
        }
        if (userStatus === '') {
            post.status = inputStatus.current.placeholder;

        } else {
            post.status = userStatus;
        }
        if (userImage === '') {
            post.imageUrl = inputImageUrl.current.placeholder;

        } else {
            post.imageUrl = userImage;
        }

        const action = editPostAction(post);
        dispatch(action);
        alert('Edit Post Thành Công');
        console.log(post);
        e.target.reset();
    }


    const handleInputSearch = (e) => {
        let { value, name } = e.target;
        setStatus({
            ...status,
            [name]: value,
        })
    }
    useEffect(() => {
        const action = dispatch(quanLyPostAction);
        dispatch(action);

    }, [])

    const hadleInputChange = (e) => {
        let { value, name } = e.target;
        setPost({
            ...post,
            [name]: value,
        })
    }
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        console.log(status.a);
        const action = searchPostAction(status.a);
        dispatch(action);
    }
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
                            <div className="container mb-4">
                                <form onSubmit={handleSubmitSearch} style={{ display: 'flex', position: 'absolute', right: '30px', marginBottom: '30px' }} >
                                    <select onChange={handleInputSearch} name='a'>
                                        <option value='ACTIVE'>ACTIVE</option>
                                        <option value='INACTIVE'>INACTIVE</option>
                                        <option value='WAITING'>WAITING</option>
                                        <option value='ACCOMPLISHED'>ACCOMPLISHED</option>
                                        <option value='DELIVERY'>DELIVERY</option>
                                        <option value='FAILURE'>FAILURE</option>
                                    </select>
                                    <button type="submit" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" >
                                        <i className="icofont-search" />
                                    </button>

                                </form>
                            </div>
                            <div className="modal fade " id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                <div className="modal-dialog col-md-12" role="document" >
                                    <div className="modal-content  " style={{ width: '670px', marginTop: '100px', marginRight: '300px' }}  >
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Search Post</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body" style={{ display: 'block' }} >
                                            <table className="table table-default all-events table-striped table-responsive-lg" style={{ padding: '10px' }}>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Price</th>
                                                        <th>Status</th>
                                                        <th>Image</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {arrSearchPost.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>{index++}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.description}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.status}</td>
                                                            <td><img src={item.imageUrl} style={{ width: '150px' }} /></td>
                                                            <td>
                                                                <button className="button soft-danger" onClick={() => {
                                                                    if (window.confirm('Are sure want to delete?')) {
                                                                        const action = deletePost(item.id);
                                                                        dispatch(action);
                                                                        alert('Delete Post Thành Công')
                                                                    }
                                                                }}><i className="icofont-trash"></i></button>

                                                                <button className="btn  transition-3d-hover" data-toggle="modal" data-target="#modelId" onClick={() => {
                                                                    const action = {
                                                                        type: 'XEM_CHI_TIET_POST',
                                                                        xemChiTietPost: item,
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
                                </div>
                            </div>
                            <div className="gap">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div id="page-contents" className="row merged20">
                                                <div className="col-lg-12">
                                                    <div className="main-wraper">
                                                        <h4 className="main-title">Post</h4>
                                                        <div className="row">
                                                            {arrPost.map((item, index) => {
                                                                return <div className="col-lg-6 col-md-6 col-sm-6" key={index}>
                                                                    <div className="course">
                                                                        <figure>
                                                                            <img src={item.imageUrl} style={{ height: '400px' }} />
                                                                            <i className="icofont-book-mark" title="bookmark"></i>
                                                                            <em>{item.status}</em>
                                                                            <span className="rate-result"><i className="icofont-star"></i> 4.5</span>
                                                                        </figure>
                                                                    </div>
                                                                    <div className="course-meta">
                                                                        <div className="post-by">
                                                                            <figure><img src="images/resources/user1.jpg" alt="" /></figure>
                                                                            <div className="course-cat">
                                                                                <span>{item.title}</span>
                                                                                <a href="#" title="">{item.lastUpdatedAt}</a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="prise">
                                                                            <span><i className="icofont-cart-alt"></i>${item.price}</span>
                                                                        </div>
                                                                        <h5 className="course-title"><a href="" title="">Description: {item.description}</a></h5>
                                                                        <h6 className="course-title"><a href="" title="">Expired : {item.expired}</a></h6>
                                                                        <div className="course-info">
                                                                            <button className="btn btn-outline-primary transition-3d-hover" data-toggle="modal" data-target="#modelId" onClick={() => {
                                                                                const action = {
                                                                                    type: 'XEM_CHI_TIET_POST',
                                                                                    xemChiTietPost: item,
                                                                                }
                                                                                dispatch(action);
                                                                            }}>Edit</button>
                                                                            <button className="btn btn-outline-danger transition-3d-hover ml-3" onClick={() => {
                                                                                if (window.confirm('Are sure want to delete?')) {
                                                                                    const action = deletePost(item.id);
                                                                                    dispatch(action);
                                                                                    alert('Delete Post Thành Công')
                                                                                }
                                                                            }}>Detele</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            })}

                                                        </div>
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
                                            <h3 className='text-center mb-3'>Edit Post</h3>
                                            <form className=" mb-3" onSubmit={handleSubmitEdit}>
                                                <div className='form-group'>
                                                    <input ref={inputId} type='hidden' onChange={hadleInputChange} name='id' className="form-control" value={editPost.id} />
                                                </div>
                                                <div className='form-group'>
                                                    <h5>Title:</h5>
                                                    <input ref={inputTitle} onChange={hadleInputChange} name='title' className="form-control" placeholder={editPost.title} />
                                                </div>
                                                <div className='form-group'>
                                                    <h5>Description:</h5>
                                                    <input ref={inputDescription} onChange={hadleInputChange} name='description' className="form-control" placeholder={editPost.description} />
                                                </div>
                                                <div className='form-group'>
                                                    <h5>Expired:</h5>
                                                    <input ref={inputExpired} onChange={hadleInputChange} name='expired' className="form-control" placeholder={editPost.expired} type='date' />
                                                </div>
                                                <div className='form-group'>
                                                    <h5>Status:</h5>
                                                    <div style={{ display: 'flex' }}>
                                                        <input ref={inputStatus} className="form-control " placeholder={editPost.status} value={post.status} disabled />
                                                        <select name='status' onChange={hadleInputChange}>
                                                            <option placeholder='ACTIVE'>ACTIVE</option>
                                                            <option placeholder='INACTIVE'>INACTIVE</option>
                                                            <option placeholder='WAITNG'>WAITNG</option>
                                                            <option placeholder='ACCOMPLISHED'>ACCOMPLISHED</option>
                                                            <option placeholder='DELIVERY'>DELIVERY</option>
                                                            <option placeholder='FAILURE'>FAILURE</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='form-group'>
                                                    <h5>Image:</h5>
                                                    <input ref={inputImageUrl} onChange={hadleInputChange} name='imageUrl' className="form-control" placeholder={editPost.imageUrl} type='hidden' />
                                                    <img src={editPost.imageUrl} style={{ height: '300px', width: '100%' }} />
                                                </div>
                                                <div className='form-group'>
                                                    <h5>Price:</h5>
                                                    <input ref={inputPrice} onChange={hadleInputChange} name='price' className="form-control" placeholder={editPost.price} />
                                                </div>
                                                <button type="submit" className="btn btn-primary" >Save</button>
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
        </div>
    )

}
