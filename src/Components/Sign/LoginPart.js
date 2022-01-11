import React, { useEffect, useRef, useState } from 'react';
import Modal from '../SameLayout/Modal';

function LoginPart(){

    return (
        <div>
          {/* Page content */}
          <div className="container mt--8 pb-5">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-7">
                <div className="card bg-secondary shadow border-0">
                  <div className="card-body px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>로그인하기</small>
                    </div>
                    <form role="form">
                      <div className="form-group mb-3">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-email-83" /></span>
                          </div>
                          <input className="form-control" placeholder="아이디" type="email" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                          </div>
                          <input className="form-control" placeholder="패스워드" type="password" />
                        </div>
                      </div>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                        <label className="custom-control-label" htmlFor=" customCheckLogin">
                          <span className="text-muted">아이디기억하기</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <button type="button" className="btn btn-primary my-4">💪득근하러가기</button>
                      </div>
                    </form>
                  </div>
                  <div className="card-header bg-transparent pb-5">
                    <div className="text-muted text-center mt-2 mb-3"><small className="login_method">다른계정으로 로그인</small></div>
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
                </div>
                <div className="row mt-3">
                  <div className="col-6 text-left">
                    <a href="./findId.html" className="text-light" ><p>아이디 찾기</p><i className="fas fa-arrow-circle-left" /></a>
                  </div>
                  <div className="col-6 text-right">
                    <a href="./findPassword.html" className="text-light"><p>비밀번호 찾기</p><i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <a href="./register.html" className="text-light"><p>회원가입</p><i className="ni ni-single-02" /></a>
          </div>

        </div>
        
      );
}
export default LoginPart