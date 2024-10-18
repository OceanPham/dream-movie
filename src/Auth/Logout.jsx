import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Input, Label, Row } from "reactstrap";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Định nghĩa schema với Yup
const schema = Yup.object().shape({
  //Tên loại ghế
  username: Yup.string()
    .required('Vui lòng nhập tên đăng nhập!')
  ,
  password: Yup.string()
    .required('Vui lòng nhập Mật khẩu!')
  ,
});
const Logout = () => {

  const { control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) })



  return (
    <>
      <Helmet>
        <title>Dream Movie</title>
      </Helmet>
      <div style={{ backgroundImage: "url('/assets/images/background.webp')", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "0 20px", }} >
        <div style={{ background: "white", padding: "65px 40px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "850px", width: "100%", maxHeight: "90vh", overflowY: "auto", }} >
          <div className="text-center w-100 mb-4">
            <img
              src="/assets/images/logo.png"
              width={80}
              alt="logo"
              className="rounded-circle"
            />
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <div className="text-center w-100 mb-4">
              Đăng nhập vào Dream Movie
            </div>

            <form
              name="loginForm"
              layout="vertical"
              style={{ width: "100%" }}
            >
              <Row>
                <Col md='12' className='mb-2'>
                  <Label for="username" className='form-label'>
                    Tên đăng nhập (Email) <span>*</span>
                  </Label>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input id="username" {...field} placeholder="Tên đăng nhập" />
                    )}
                  />
                  {errors.username && (
                    <span className="errors">{errors.username.message}</span>
                  )}
                </Col>

                <Col md='12' className='mb-2'>
                  <Label for="password" className='form-label'>
                    Mật khẩu <span>*</span>
                  </Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input id="password" {...field} placeholder="Mật khẩu" />
                    )}
                  />
                  {errors.password && (
                    <span className="errors">{errors.password.message}</span>
                  )}
                </Col>
                <Col className='mt-50'>
                  <Button color='primary' className='me-1' >
                    Lưu
                  </Button>

                </Col>

              </Row>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
