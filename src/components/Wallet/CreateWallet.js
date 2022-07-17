import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quanLyUserAction } from '../../redux/actions/type/quanLyUserAction';
import { createWallet } from '../../redux/actions/type/quanLyWalletAction';
export default function CreateWallet (props) {
    const dispatch = useDispatch();
    const [wallet, setWallet] = useState({
        formValues: {
            balance: '', type: '', currency: '', status: 'ACTIVE', desription: '', userId: ''
        },
        formErrors: {
            balance: '', type: '', currency: '', status: 'ACTIVE', desription: '', userId: ''
        },
        formValidity: {
            balance: false, type: false, currency: false, status: 'ACTIVE', desription: false, userId: false
        }

    });
    const handleChangeInput = (e) => {
        const { formValues } = wallet;
        formValues[e.target.name] = e.target.value;
        setWallet({ formValues });
        handleValidation(e.target);
        console.log(formValues);
    }
    const handleValidation = (target) => {
        const { name, value } = target;
        const fieldValidationErrors = wallet.formErrors;
        const validity = wallet.formValidity;
        const isType = name === "type";
        const isCurrency = name === "currency";
        const isDescription = name === "desription";
        const numberTest = /^(?:[1-9]\d*|\d)$/;
        const isBalance = name === "balance";
        // const isImageUrl = name === "imageUrl";
        // const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        validity[name] = value.length > 0;
        fieldValidationErrors[name] = validity[name]
            ? ""
            : `${name} is required and cannot be empty`;

        if (isBalance) {
            validity[name] = numberTest.test(value);
            fieldValidationErrors[name] = validity[name]
                ? ""
                : `${name} should be only number`;
        }

        if (validity[name]) {
            if (isType) {
                validity[name] = value.length >= 2;
                fieldValidationErrors[name] = validity[name]
                    ? ""
                    : `${name} should be 3 characters minimum`;
            }
            if (isDescription) {
                validity[name] = value.length >= 3;
                fieldValidationErrors[name] = validity[name]
                    ? ""
                    : `${name} should be 3 characters minimum`;
            }
            if (isCurrency) {
                validity[name] = value.length >= 2;
                fieldValidationErrors[name] = validity[name]
                    ? ""
                    : `${name} should be 2 characters minimum`;
            }

        }

        setWallet({
            ...wallet,
            formErrors: fieldValidationErrors,
            formValidity: validity,
        });
    };

    console.log(wallet);
    const handleSubmit = (e) => {
        e.preventDefault();

        const { formValues, formValidity } = wallet;
        if (Object.values(formValidity).every(Boolean)) {
            console.log(formValues);

            const action = createWallet(formValues);
            dispatch(action);
            e.target.reset();
            alert('Create Wallet thanh cong!!!');
            props.history.push('/wallet');
        } else {
            for (let key in formValues) {
                let target = {
                    name: key,
                    value: formValues[key]
                };
                handleValidation(target);

            }
        }

    }
    const arrUser = useSelector(rootReducer => rootReducer.quanLyUserReducer.arrUser);
    useEffect(() => {
        const action = dispatch(quanLyUserAction);
        dispatch(action);
    }, [])

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
                        </div>
                    </div>
                    <div className="gap">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                    <aside className="sidebar">
                                        <div className="widget">
                                            <h4 className="widget-title">Recent Media</h4>
                                            <div className="recent-media">
                                                <figure>
                                                    <img src="images/resources/course-6.jpg" alt="" />
                                                    <a className="play-btn" data-fancybox="" href="https://www.youtube.com/watch?v=nOCXXHGMezU&amp;feature=emb_title"><i className="icofont-play"></i></a>
                                                    <span>Vu.Js Free Tutorial</span>
                                                </figure>
                                                <figure>
                                                    <img src="images/resources/course-1.jpg" alt="" />
                                                    <a className="play-btn" data-fancybox="" href="https://www.youtube.com/watch?v=nOCXXHGMezU&amp;feature=emb_title"><i className="icofont-play"></i></a>
                                                    <span>Css3 2020 Tutorial</span>
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="widget">
                                            <h4 className="widget-title">Post Analytics</h4>
                                            <ul className="widget-analytics">
                                                <li>Reads <span>56</span></li>
                                                <li>Recommendations <span>3</span></li>
                                                <li>Shares <span>22</span></li>
                                                <li>References <span>17</span></li>
                                            </ul>
                                        </div>

                                        <div className="widget">
                                            <h4 className="widget-title">Add Credits</h4>
                                            <div className="set-card">
                                                <img src="images/paypal.png" alt="" />
                                                <p>
                                                    Add credits to your account
                                                </p>
                                                <a className="main-btn" href="#" title="">Set Card</a>
                                                <div className="added-complete">
                                                    <h6>Added: <span>25 Mar 2020</span></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </aside>

                                </div>
                                <div className="col-lg-8">
                                    <div className="main-wraper">
                                        <h4 className="main-title">Add New Wallet</h4>
                                        <h6 className="mb-4">Add new Wallet of user</h6>
                                        <div className="add-credits">
                                            <form onSubmit={handleSubmit}>
                                                <fieldset className="row merged-10">
                                                    <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                                        <input onChange={handleChangeInput} name='balance' type="text" placeholder="Balance" className={`form-control ${wallet.formErrors.balance ? "is-invalid uk-input" : ""
                                                            }`} />
                                                        <div className="invalid-feedback">
                                                            {wallet.formErrors.balance}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                                        <input onChange={handleChangeInput} name='type' type="text" placeholder="Type" className={`form-control ${wallet.formErrors.type ? "is-invalid uk-input" : ""
                                                            }`} />
                                                        <div className="invalid-feedback">
                                                            {wallet.formErrors.type}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                                        <input onChange={handleChangeInput} name='currency' type="text" placeholder="Currency" className={`form-control ${wallet.formErrors.currency ? "is-invalid uk-input" : ""
                                                            }`} />
                                                        <div className="invalid-feedback">
                                                            {wallet.formErrors.currency}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                                        <input onChange={handleChangeInput} name='status' type="hidden" placeholder="Status" />
                                                    </div>
                                                    <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                                        <input onChange={handleChangeInput} name='desription' type="text" placeholder="Description" className={`form-control ${wallet.formErrors.description ? "is-invalid uk-input" : ""
                                                            }`} />
                                                        <div className="invalid-feedback">
                                                            {wallet.formErrors.desription}
                                                        </div>
                                                    </div>

                                                    <select onChange={handleChangeInput} className="mb-4 col-lg-12 col-md-12 col-sm-12 uk-input" name='userId'>
                                                        {arrUser.filter(sp => sp.role.name === "RESIDENT" && sp.status === 'ACTIVE').map((item, index) => {
                                                            return <option key={index} value={item.id}>{item.userName}</option>
                                                        })}
                                                    </select>

                                                </fieldset>
                                                <div className="mt-3 col-lg-12">
                                                    <button type="submit" className="button primary circle">Create</button>
                                                </div>
                                            </form>

                                            <p>
                                                <b>Special Note: </b>
                                                " Fill in the correct information about the building ."
                                            </p>
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
