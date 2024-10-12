import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
  Row,
  Col,
  Modal,
} from "antd";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import moment, { now } from "moment";
import { useNavigate } from "react-router-dom"; // Thay thế useHistory bằng useNavigate
import { useAddUser } from "../views/pages/Managers/ChairCategory/hook";
import { toast } from "react-toastify";
import { useGetALLUser } from "../views/pages/Managers/Showtime/hook";

const { Option } = Select;

// Danh sách 63 tỉnh thành Việt Nam
const provinces = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bạc Liêu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Dương",
  "Bình Định",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Cần Thơ",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "TP. Hồ Chí Minh",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

const validateMessages = {
  required: "${label} không được bỏ trống!",
  types: {
    email: "${label} không đúng định dạng email!",
  },
  string: {
    max: "${label} không được dài hơn ${max} ký tự!",
    min: "${label} phải có ít nhất ${min} ký tự!",
  },
};

const Login = () => {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const { status: sttEdit, mutate: addUser } = useAddUser();
  const { status, data: dataUser } = useGetALLUser();

  const onFinish = (values) => {
    console.log("Success:", values);
    localStorage.setItem("users", "loggedin");

    const db_submit = {
      role: {
        id: parseInt(values?.role) || 1,
      },
      full_name: values.fullname || "",
      gender: values.gender,
      birth_day: moment(values.birthday),
      home_town: values.province,
      email: values.email,
      phone: values.phone,
      password: values.password,
      createdAt: moment(now()),
      updatedAt: moment(now()),
      deletedAt: null,
    };

    addUser(db_submit, {
      onSuccess: () => {
        toast.success("Đăng ký tài khoản thành công!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      },
      onError: () => toast.error("Đăng ký tài khoản thất bại!"),
    });
  };

  const onFinishLogin = (values) => {
    console.log("Login:", values);
    console.log("Danh sách các user hiện tại đang có:", dataUser);

    const foundUser = dataUser?.find(
      (user) =>
        user.email === values.username && user.password === values.password,
    );

    if (foundUser) {
      // Đăng nhập thành công
      localStorage.setItem("userData", JSON.stringify(foundUser)); // Chuyển đối tượng thành chuỗi JSON
      toast.success("Đăng nhập thành công!");
      navigate("/dashboard"); // Điều hướng đến trang dashboard hoặc trang khác
    } else {
      // Thông báo lỗi nếu tài khoản không tồn tại
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validatePassword = (_, value) => {
    //1
    if (!value) {
      //2
      return Promise.reject(new Error("Mật khẩu không được bỏ trống!")); //3
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{10,50}$/.test(value)) {
      //4
      return Promise.reject(
        new Error(
          "Mật khẩu phải chứa ít nhất 1 chữ in hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt!",
        ),
      ); //5
    }
    return Promise.resolve(); // 6
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    //1
    validator(_, value) {
      //2
      if (!value) {
        // 3
        return Promise.reject(new Error("Mật khẩu không được để trống")); // 4
      }
      if (getFieldValue("password") === value) {
        // 5
        return Promise.resolve(); // 6
      }
      return Promise.reject(new Error("Mật khẩu nhập lại không khớp!")); // 7
    },
  });

  const validateFullname = (_, value) => {
    const regex = /^[a-zA-ZÀ-ỹ\s]{1,50}$/;
    if (!value) {
      return Promise.reject(new Error("Họ và tên không được bỏ trống!"));
    }
    if (!regex.test(value)) {
      return Promise.reject(
        new Error("Họ và tên không được chứa số và ký tự đặc biệt!"),
      );
    }
    return Promise.resolve();
  };

  const validateBirthday = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Vui lòng chọn ngày sinh!"));
    }
    const fourteenYearsAgo = moment().subtract(14, "years");
    if (value.isAfter(fourteenYearsAgo)) {
      return Promise.reject(new Error("Tuổi phải lớn hơn 14!"));
    }
    return Promise.resolve();
  };

  const validatePhoneNumber = (_, value) => {
    const regex = /^0\d{9}$/;
    if (!value) {
      return Promise.reject(new Error("Vui lòng nhập số điện thoại!"));
    }
    if (!regex.test(value)) {
      return Promise.reject(new Error("Số điện thoại không hợp lệ!"));
    }
    return Promise.resolve();
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!value) {
      return Promise.reject(new Error("Vui lòng nhập email!"));
    }
    if (value.length > 254) {
      return Promise.reject(new Error("Email vượt quá giới hạn 254 ký tự!"));
    }
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error("Email không hợp lệ!"));
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "65px 40px",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "850px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
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
              {mode === "login"
                ? "Đăng nhập vào Dream Movie"
                : "Đăng ký tài khoản Dream Movie"}
            </div>
            {mode === "login" ? (
              <Form
                name="loginForm"
                layout="vertical"
                style={{ width: "100%" }}
                onFinish={onFinishLogin}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Tên đăng nhập (Email)"
                  name="username"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                  ]}
                >
                  <Input placeholder="Tên đăng nhập" />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Form
                name="registerForm"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                validateMessages={validateMessages}
                style={{ width: "100%" }}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Họ và tên"
                      name="fullname"
                      rules={[{ validator: validateFullname }]}
                    >
                      <Input placeholder="Nhập họ và tên của bạn" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Giới tính"
                      name="gender"
                      rules={[
                        { required: true, message: "Vui lòng chọn giới tính!" },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                        <Radio value="other">Khác</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Ngày sinh"
                      name="birthday"
                      rules={[{ validator: validateBirthday }]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày sinh"
                        disabledDate={(current) =>
                          current && current > moment().endOf("day")
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Quê quán"
                      name="province"
                      rules={[
                        { required: true, message: "Vui lòng chọn quê quán!" },
                      ]}
                    >
                      <Select placeholder="Chọn quê quán">
                        {provinces.map((province) => (
                          <Option key={province} value={province}>
                            {province}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      rules={[{ validator: validatePhoneNumber }]}
                    >
                      <Input placeholder="Nhập số điện thoại của bạn" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ validator: validateEmail }]}
                    >
                      <Input placeholder="Nhập địa chỉ email của bạn" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[{ validator: validatePassword }]}
                    >
                      <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Nhập lại mật khẩu"
                      name="confirmPassword"
                      rules={[validateConfirmPassword]}
                    >
                      <Input.Password placeholder="Nhập lại mật khẩu" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                "Vui lòng đồng ý với các điều khoản sử dụng",
                              ),
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    Tôi đã đọc, hiểu và đồng ý với các điều khoản sử dụng
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
            )}

            <div className="text-center w-100 mt-4">
              <span>
                {mode === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              </span>
              <a
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                style={{ color: "blue", cursor: "pointer" }}
              >
                {mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
