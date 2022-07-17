import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAdmin } from '../../redux/actions/type/loginAction';
import { layDanhSachBudingAction } from '../../redux/actions/type/quanLYBuildingAction';
export default function CreateAccountAdmin (props) {
    const arrBuilding = useSelector(rootReducer => rootReducer.quanLyBuildingReducer.arrBuilding);
    const [admin, setAdmin] = useState({ userName: '', password: '', fullName: '', email: '', image: '', phone: '', gender: 'MALE', buildingId: 'c9159610-6869-4ddf-13ad-08da511e36b4' });
    const handlechangeInput = (e) => {
        let { value, name } = e.target;
        setAdmin({
            ...admin,
            [name]: value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(admin);
        const action = createAdmin(admin);
        dispatch(action);

    }
    const dispatch = useDispatch();
    useEffect(() => {
        const action = layDanhSachBudingAction();
        dispatch(action);

    }, [])
    return (
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

                <div className="mockup left-bottom">
                    <img src="images/mockup.png" alt="" />
                </div>
                <div className="verticle-center">
                    <div className="login-form">
                        <h4>
                            <i className="icofont-key-hole" /> Đăng Ký Tài Khoản Admin
                        </h4>
                        <form className='c-form' onSubmit={handleSubmit}>
                            <fieldset className="row merged-10">
                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                    <input onChange={handlechangeInput} name='userName' className="uk-input" type="text" placeholder=" User Name" />
                                </div>
                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                    <input onChange={handlechangeInput} name='password' className="uk-input" type="password" placeholder="Password" />
                                </div>
                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                    <input onChange={handlechangeInput} name='fullName' className="uk-input" type="text" placeholder="Full Name" />
                                </div>
                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                    <input onChange={handlechangeInput} name='email' className="uk-input" type="text" placeholder="Email" />
                                </div>
                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                    <input onChange={handlechangeInput} name='image' className="uk-input" type="text" placeholder="Image" />
                                </div>
                                <div className="mb-4 col-lg-12 col-md-12 col-sm-12">
                                    <input onChange={handlechangeInput} name='phone' className="uk-input" type="text" placeholder="Phone" />
                                </div>
                                <select onChange={handlechangeInput} name='gender' className="uk-input mb-4 col-lg-12 col-md-12 col-sm-12">
                                    <option value='MALE'>MALE</option>
                                    <option value='FEMALE'>FEMALE</option>
                                    <option value='OTHER'>OTHER</option>
                                </select>
                                <select onChange={handlechangeInput} name='buildingId' className="uk-input mb-4 col-lg-12 col-md-12 col-sm-12">
                                    {arrBuilding.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.name}</option>
                                    })}
                                </select>
                            </fieldset>
                            <div className="mt-3 col-lg-12">
                                <button type="submit" className="button primary circle">Create</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
