import React, { useState, useEffect } from 'react';
import { createApartmentAction, layDanhSachApartment } from '../../redux/actions/type/createApartmentAction';
import { useDispatch, useSelector } from 'react-redux';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from './../../firebase'


export default function CreateApartment (props) {
    const [apartment, setApartment] = useState({
        formValues: {
            name: '', description: '', address: '', imageUrl: ''
        },
        formErrors: {
            name: '', description: '', address: '', imageUrl: ''
        },
        formValidity: {
            name: false, description: false, address: false, imageUrl: false
        }
    });
    const [percent, setPercent] = useState(0);
    const [file, setFile] = useState("");
    const handleChangeImage = (e) => {
        setFile(e.target.files[0]);

    }
    const handleUpload = () => {

    };



    const arrApartment = useSelector(rootReducer => rootReducer.quanLyApartmentReducer.arrApartment);
    const dispatch = useDispatch();
    const handleChangeInput = (e) => {
        const { formValues } = apartment;
        formValues[e.target.name] = e.target.value;
        setApartment({ formValues });
        handleValidation(e.target);
        console.log(formValues);

    }

    const handleValidation = (target) => {
        const { name, value } = target;
        const fieldValidationErrors = apartment.formErrors;
        const validity = apartment.formValidity;
        const picture = apartment.formValues;
        const isName = name === "name";
        const isDescription = name === "description";
        const isAddress = name === "address";
        // const isImageUrl = name === "imageUrl";
        // const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        validity[name] = value.length > 0;
        fieldValidationErrors[name] = validity[name]
            ? ""
            : `${name} is required and cannot be empty`;

        if (validity[name]) {
            // if (isEmail) {
            //     validity[name] = emailTest.test(value);
            //     fieldValidationErrors[name] = validity[name]
            //         ? ""
            //         : `${name} should be a valid email address`;
            // }
            if (isAddress) {
                validity[name] = value.length >= 3;
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
            // if (isImageUrl) {
            //     const storageRef = ref(storage, `/files/${picture[name].name}`);
            //     const uploadTask = uploadBytesResumable(storageRef, picture[name]);
            //     uploadTask.on(
            //         "state_changed",
            //         (snapshot) => {
            //             const percent = Math.round(
            //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            //             );
            //             setPercent(percent);
            //         },
            //         (err) => console.log(err),
            //         () => {
            //             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //                 console.log(url);
            //                 picture.imageUrl = url;
            //             });
            //         }
            //     );
            // }
        }

        setApartment({
            ...apartment,
            formErrors: fieldValidationErrors,
            formValidity: validity,
            formValues: picture,
        });
    };
    useEffect(() => {
        const action = dispatch(layDanhSachApartment);
        dispatch(action);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const m = apartment.formValues;
        const storageRef = ref(storage, `/files/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // console.log(url);
                    m.imageUrl = url;
                });
            }
        );


        const { formValues, formValidity } = apartment;
        if (Object.values(formValidity).every(Boolean)) {
            console.log(formValues);

            const action = createApartmentAction(formValues);
            dispatch(action);
            alert('Create Aparment Thành Công');
            e.target.reset();
            props.history.push('/apartment');
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

    if (localStorage.getItem('login') === 'admin') {
        return (
            <div>
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
                                    <h4 className="main-title">Add New Apartment</h4>
                                    <h6 className="mb-4">Add new apartment and address</h6>
                                    <div className="add-credits">
                                        <form onSubmit={handleSubmit}>
                                            <fieldset className="row merged-10">
                                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                                    <input onChange={handleChangeInput} name='name' type="text" placeholder="Apartment Name" className={`form-control ${apartment.formErrors.name ? "is-invalid uk-input" : ""
                                                        }`} />
                                                    <div className="invalid-feedback">
                                                        {apartment.formErrors.name}
                                                    </div>
                                                </div>
                                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                                    <input onChange={handleChangeInput} name='description' type="text" placeholder="Description" className={`form-control ${apartment.formErrors.description ? "is-invalid uk-input" : ""
                                                        }`} />
                                                    <div className="invalid-feedback">
                                                        {apartment.formErrors.description}
                                                    </div>
                                                </div>
                                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                                    <input onChange={handleChangeInput} name='address' type="text" placeholder="Address" className={`form-control ${apartment.formErrors.address ? "is-invalid uk-input" : ""
                                                        }`} />
                                                    <div className="invalid-feedback">
                                                        {apartment.formErrors.address}
                                                    </div>
                                                </div>
                                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">

                                                    <input onChange={handleChangeImage} accept="/image/*" type="file" />
                                                    {/* <button onClick={handleUpload}>Upload to Firebase</button> */}
                                                    {/* <div className="invalid-feedback">
                                                    {apartment.formErrors.imageUrl}
                                                </div> */}
                                                </div>

                                            </fieldset>
                                            <div className="mt-3 col-lg-12">
                                                <button type="submit" className="button primary circle">Create</button>
                                                <button type="reset" className="button success circle ml-3">Reset</button>
                                            </div>
                                        </form>
                                        <p>
                                            <b>Special Note: </b>
                                            " Fill in the correct information about the Apartment ."
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div></div>
        )
    }
    alert('Bạn Không đủ quyền truy cập');
    props.history.push('/')
}
