import React, { useEffect, useState } from 'react';
import ResponsiveDatePickers from '../SameLayout/DatePicker';
import { useNavigate} from 'react-router'; 
import axios from "axios";

function SignUpPart(){

    const navigate = useNavigate();

    let [id, changeId] = useState();
    let [password, changePassword] = useState();
    let [name, changeName] = useState();
    let [gender, changeGender] = useState();
    let [email, changeEmail] = useState();
    let [birth, changeBirth] = useState();

    const signUpBTNClick = (e) => {
        e.preventDefault();

        console.log(id, password, name, gender, email, birth);
        axios.post("http://127.0.0.1:8000/api/user/signup", {
            id : id,
            password : password,
            name : name,
            gender : gender,
            email : email,
            birth : birth,
        })
        .then(res => {
            console.log(res.data);
            //axios.defaults.headers.common['Authorization'] = `token ${res.payload.accessToken}`
            navigate('/account/signin');
        })
        .catch(err => 
            console.log(err.response.data)
        )
    }

    return (

        <div>
        {/* Page content */}
            <div className="container mt--8 pb-5">
            {/* Table */}
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                <div className="card bg-secondary shadow border-0">
                    <div className="card-body px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <small>계정만들기</small>
                    </div>
                    <form role="form">
                        <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-single-02" /></span>
                            </div>
                            <input className="form-control" placeholder="아이디" type="text" onChange={(e) => {
                                changeId(e.target.value);
                            }}/>
                        </div>
                        </div>
                        <div className="text-muted font-italic"><small>보안수준: <span className="text-success font-weight-700">안전함</span></small></div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                            </div>
                            <input className="form-control" placeholder="패스워드" type="password" onChange={(e) => {
                                changePassword(e.target.value);
                            }}/>
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                            </div>
                            <input className="form-control" placeholder="패스워드확인" type="password" />
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-circle-08" /></span>
                            </div>
                            <input className="form-control" placeholder="이름" type="email" onChange={(e) => {
                                changeName(e.target.value);
                            }}/>
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-email-83" /></span>
                            </div>
                            <input className="form-control" placeholder="이메일" type="email" onChange={(e) => {
                                changeEmail(e.target.value);
                            }}/>
                        </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 sex">
                                <div className="custom-control custom-control-alternative custom-checkbox sex">
                                <input className="custom-control-input" id="man" value="man" type="checkbox" onChange={(e) => {
                                    changeGender(e.target.value);
                                }}/>
                                <label className="custom-control-label seperator" htmlFor="man">
                                    <span className="text-muted">남자</span>
                                </label>
                                </div>
                                <div className="custom-control custom-control-alternative custom-checkbox sex ">
                                <input className="custom-control-input" id="woman" value="woman" type="checkbox" onChange={(e) => {
                                    changeGender(e.target.value);
                                }}/>
                                <label className="custom-control-label" htmlFor="woman">
                                    <span className="text-muted">여자</span>
                                </label>
                                </div>
                            </div>
                        </div>
                        <input type="date" id="birth" onChange={(e) => {
                            changeBirth(e.target.value.toString());
                        }}/>
                        <ResponsiveDatePickers/>
                    </form>
                    <div className="card-header bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3"><small className="login_method">다른계정으로 계정생성</small></div>
                        <div className="btn-wrapper text-center">
                        <a href="#" className="btn btn-neutral btn-icon">
                            <span className="btn-inner--icon"><img src="../assets/img/brand/카카오톡로고.png" /></span>
                            <span className="btn-inner--text">KAKAO</span>
                        </a>
                        <a href="#" className="btn btn-neutral btn-icon">
                            <span className="btn-inner--icon"><img src="../assets/img/icons/common/google.svg" /></span>
                            <span className="btn-inner--text">GOOGLE</span>
                        </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary mt-4" onClick={signUpBTNClick}>💪PT등록하기</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      );
}
export default SignUpPart