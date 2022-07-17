import React, { useState, } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import { loginAction } from '../../redux/actions/type/loginAction';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Login (props) {
    const dispatch = useDispatch();
    const [login, setLogin] = useState({
        formValues: {
            userName: "",
            password: ""
        },
        formErrors: {
            userName: "",
            password: ""
        },
        formValidity: {
            userName: false,
            password: false
        }
    });

    const handleChangeInput = (e) => {
        const { formValues } = login;
        formValues[e.target.name] = e.target.value;
        setLogin({ formValues });
        handleValidation(e.target);
    }
    const handleValidation = (target) => {
        const { name, value } = target;
        const fieldValidationErrors = login.formErrors;
        const validity = login.formValidity;
        // const isEmail = name === "userName";
        const isPassword = name === "password";
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
            if (isPassword) {
                validity[name] = value.length >= 3;
                fieldValidationErrors[name] = validity[name]
                    ? ""
                    : `${name} should be 3 characters minimum`;
            }
        }

        setLogin({
            ...login,
            formErrors: fieldValidationErrors,
            formValidity: validity
        });
    };


    const handleSubmit = event => {
        event.preventDefault();
        const { formValues, formValidity } = login;
        if (Object.values(formValidity).every(Boolean)) {
            console.log(formValues);
            if (formValues.userName === 'admin' && formValues.password === 'admin') {
                localStorage.setItem('login', 'admin');
                const action = loginAction(formValues);
                dispatch(action);
                props.history.push('/adminbuilding')
            }
            else {
                alert('Tài khoản hoặc mật khẩu sai!!!');
            }
        } else {
            for (let key in formValues) {
                let target = {
                    name: key,
                    value: formValues[key]
                };
                handleValidation(target);

            }
        }
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (login.userName === '' || login.password === '') {
    //         alert('Không bỏ trống tài khoản mật khẩu');
    //     }
    //     else {
    //         const action = loginAction(login);
    //         dispatch(action);
    //         if (localStorage.getItem('loginadmin') !== '' || login.userName.length > 3) {
    //             props.history.push('/adminbuilding')
    //         }

    //     }
    // }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            // console.log(result);
            // console.log(result.user.accessToken);
            axios({
                url: 'https://old-stuff-exchange.azurewebsites.net/api/users/login',
                method: 'POST',
                data: {
                    token: result.user.accessToken,
                }
            }).then((value) => {
                console.log(value);
            })

            console.log(result.user.accessToken);
            localStorage.setItem('a', result.user.displayName);
            localStorage.setItem('userlogin', result.user.email);
            // console.log(result.user.displayName);
            // <Redirect to="/admin/dashboard" />

            props.history.push("/home");

        }).catch((error) => {
            console.log(error);
        })


    }

    return (

        <div>
            <div className="theme-layout">
                <div className="authtication  high-opacity">

                    <ul className="welcome-caro">
                        <li className="welcome-box">
                            <figure>
                                <img
                                    style={{
                                        width: 573,
                                        height: 435,
                                    }}
                                    src="./images/background/background.jpg"
                                    alt=""
                                />
                            </figure>

                            <h4 style={{ color: 'black' }}>OLD-STUFF-EXCHANGE</h4>
                            <p style={{ color: 'black' }}>
                                Trao đổi những sản phẩm vật dụng cần thiết trong chung cư
                            </p>
                        </li>

                    </ul>
                </div>
                <div className="auth-login">
                    <div className="logo">
                        <img src="images/logo.png" alt="" />
                        <span>Socimo</span>
                    </div>
                    <div className="mockup left-bottom">
                        <img src="images/mockup.png" alt="" />
                    </div>
                    <div className="verticle-center">
                        <div className="login-form">
                            <h4>
                                <i className="icofont-key-hole" /> Đăng nhập
                            </h4>
                            <form className="c-form" onSubmit={handleSubmit}>
                                <input
                                    onChange={handleChangeInput}
                                    name="userName"
                                    type="text"
                                    placeholder="User Name"
                                    value={login.formValues.userName}
                                    className={`form-control ${login.formErrors.userName ? "is-invalid" : ""
                                        }`}
                                />
                                <div className="invalid-feedback">
                                    {login.formErrors.userName}
                                </div>
                                <input
                                    onChange={handleChangeInput}
                                    name="password"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className={`form-control ${login.formErrors.password ? "is-invalid" : ""
                                        }`}
                                    value={login.formValues.password}
                                />
                                <div className="invalid-feedback">
                                    {login.formErrors.password}
                                </div>
                                <p
                                    style={{
                                        marginTop: 20,
                                        fontSize: 16,
                                        borderBottom: "2px solid #17a2b8",
                                        paddingBottom: 4,
                                        width: "max-content",
                                        cursor: "pointer",
                                    }}
                                    onClick={signInWithGoogle}
                                >

                                    Đăng nhập với Google
                                </p>
                                <Link to='/createaccountadmin'
                                    style={{
                                        marginTop: 20,
                                        fontSize: 16,
                                        borderBottom: "2px solid #17a2b8",
                                        paddingBottom: 4,
                                        width: "max-content",
                                        cursor: "pointer",
                                    }}
                                >
                                    Create Account Admin
                                </Link>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >

                                    <button
                                        style={{
                                            marginLeft: 8,
                                        }}
                                        className="main-btn" type='submit'
                                    >
                                        <i className="icofont-key" /> Đăng nhập
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )

}
