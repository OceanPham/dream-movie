// src/pages/Login.js
import { Button, Checkbox, Form, Input, Radio, DatePicker, Select, Row, Col } from 'antd';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';

const { Option } = Select;

// Danh sách 63 tỉnh thành Việt Nam
const provinces = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Giang", "Bắc Kạn",
  "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước",
  "Bình Thuận", "Cà Mau", "Cao Bằng", "Cần Thơ", "Đà Nẵng",
  "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
  "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh",
  "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
  "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
  "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
  "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
  "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng",
  "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
  "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh", "Tuyên Quang",
  "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const validateMessages = {
  required: "${label} không được bỏ trống!",
  types: {
    email: "${label} không đúng định dạng email!",
  },
  string: {
    max: "${label} không được dài hơn ${max} ký tự!",
    min: "${label} phải có ít nhất ${min} ký tự!",
  }
};

const Login = () => {
  const [mode, setMode] = useState('login');

  const onFinish = (values) => {
    console.log('Success:', values);
    localStorage.setItem('users', 'loggedin');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Mật khẩu không được bỏ trống!'));
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{10,50}$/.test(value)) {
      return Promise.reject(new Error('Mật khẩu phải chứa ít nhất 1 chữ in hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt!'));
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
    },
  });

  const validateFullname = (_, value) => {
    const regex = /^[a-zA-ZÀ-ỹ\s]{1,50}$/;
    if (!value) {
      return Promise.reject(new Error('Họ và tên không được bỏ trống!'));
    }
    if (!regex.test(value)) {
      return Promise.reject(new Error('Họ và tên không được chứa số và ký tự đặc biệt!'));
    }
    return Promise.resolve();
  };

  const validateBirthday = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Vui lòng chọn ngày sinh!'));
    }
    // Kiểm tra xem ngày sinh có lớn hơn ngày hiện tại trừ 14 năm không
    const today = moment();
    const fourteenYearsAgo = moment().subtract(14, 'years');
    if (value.isAfter(fourteenYearsAgo)) {
      return Promise.reject(new Error('Tuổi phải lớn hơn 14!'));
    }
    return Promise.resolve();
  };
  

  const validatePhoneNumber = (_, value) => {
    const regex = /^0\d{9}$/;
    if (!value) {
      return Promise.reject(new Error('Vui lòng nhập số điện thoại!'));
    }
    if (!regex.test(value)) {
      return Promise.reject(new Error('Số điện thoại không hợp lệ!'));
    }
    return Promise.resolve();
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!value) {
      return Promise.reject(new Error('Vui lòng nhập email!'));
    }
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('Email không hợp lệ!'));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Helmet>
        <title>Dream Movie</title>
      </Helmet>
      <div
        style={{
          backgroundImage: "url('/assets/images/background.webp')",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '65px 40px',
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '850px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <div className="text-center w-100 mb-4">
            <img src="/assets/images/logo.png" width={80} alt="logo" className="rounded-circle" />
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <div className="text-center w-100 mb-4">
              {mode === 'login' ? 'Đăng nhập vào Dream Movie' : 'Đăng ký tài khoản Dream Movie'}
            </div>
            {mode === 'login' ? (
              <Form
                name="loginForm"
                layout="vertical"
                style={{ width: '100%' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                validateMessages={validateMessages}
              >
                <Form.Item
                  label="Tên đăng nhập"
                  name="username"
                  rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>Đăng nhập</Button>
                </Form.Item>
              </Form>
            ) : (
              <Form
                name="signupForm"
                layout="vertical"
                style={{ width: '100%' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                validateMessages={validateMessages}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Họ và tên"
                      name="fullname"
                      rules={[{ validator: validateFullname }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Giới tính"
                      name="gender"
                      rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                    >
                      <Radio.Group>
                        <Radio style={{ marginRight: '60px' }} value="male">Nam</Radio>
                        <Radio style={{ marginRight: '60px' }} value="female">Nữ</Radio>
                        <Radio style={{ marginRight: '60px' }} value="other">Khác</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Ngày sinh"
                      name="birthday"
                      rules={[{ validator: validateBirthday }]}
                    >
                      <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Quê quán"
                      name="hometown"
                      rules={[{ required: true, message: 'Vui lòng chọn quê quán!' }]}
                    >
                      <Select placeholder="Chọn quê quán">
                        {provinces.map((province) => (
                          <Option key={province} value={province}>{province}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ validator: validateEmail }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      rules={[{ validator: validatePhoneNumber }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[{ validator: validatePassword }]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Nhập lại mật khẩu"
                      name="confirmPassword"
                      dependencies={['password']}
                      rules={[validateConfirmPassword]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="terms"
                  valuePropName="checked"
                  rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với các điều khoản!')) }]}
                >
                  <Checkbox>
                    Tôi đã đọc, hiểu và đồng ý với <a href="/terms">các điều khoản</a>.
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>Đăng ký</Button>
                </Form.Item>
              </Form>
            )}
            <div className="text-center w-100 mt-3">
              {mode === 'login' ? (
                <Button type="link" onClick={() => setMode('signup')}>Chưa có tài khoản? Đăng ký!</Button>
              ) : (
                <Button type="link" onClick={() => setMode('login')}>Đã có tài khoản? Đăng nhập!</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
