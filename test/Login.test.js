import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../src/Auth/Login";  // Đường dẫn đến component Login của bạn
import { toast } from "react-toastify";
import { useAddUser, useGetALLUser } from "../views/pages/Managers/hooks";

//Mock các hook API
jest.mock("../views/pages/Managers/hooks", () => ({
  useAddUser: jest.fn(),
  useGetALLUser: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  },
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockAddUser = jest.fn();
const mockGetALLUser = jest.fn();

describe("Login Component", () => {
  beforeEach(() => {
    useAddUser.mockReturnValue({ mutate: mockAddUser });
    useGetALLUser.mockReturnValue({
      status: "success",
      data: [
        {
          id: 1,
          email: "test@example.com",
          password: "Password1!",
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Hiển thị form đăng nhập", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Kiểm tra các thành phần chính của form
    expect(screen.getByText(/Đăng nhập vào Dream Movie/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tên đăng nhập/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mật khẩu/i)).toBeInTheDocument();
    expect(screen.getByText(/Đăng nhập/i)).toBeInTheDocument();
  });

  test("Thực hiện đăng nhập thành công", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Tên đăng nhập/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mật khẩu/i), {
      target: { value: "Password1!" },
    });

    fireEvent.click(screen.getByText(/Đăng nhập/i));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "userData",
        JSON.stringify({
          id: 1,
          email: "test@example.com",
          password: "Password1!",
        })
      );
      expect(toast.success).toHaveBeenCalledWith("Đăng nhập thành công!");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("Thực hiện đăng nhập thất bại", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Tên đăng nhập/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mật khẩu/i), {
      target: { value: "WrongPassword1!" },
    });

    fireEvent.click(screen.getByText(/Đăng nhập/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Tên đăng nhập hoặc mật khẩu không đúng!"
      );
    });
  });

  test("Thực hiện đăng ký người dùng mới thành công", async () => {
    useGetALLUser.mockReturnValue({
      status: "success",
      data: [],
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Đăng ký ngay/i));

    fireEvent.change(screen.getByLabelText(/Họ và tên/i), {
      target: { value: "Nguyen Van A" },
    });
    fireEvent.change(screen.getByLabelText(/Số điện thoại/i), {
      target: { value: "0123456789" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mật khẩu/i), {
      target: { value: "Password1!" },
    });
    fireEvent.change(screen.getByLabelText(/Nhập lại mật khẩu/i), {
      target: { value: "Password1!" },
    });

    fireEvent.click(screen.getByText(/Đăng ký/i));

    await waitFor(() => {
      expect(mockAddUser).toHaveBeenCalledWith(
        expect.objectContaining({
          full_name: "Nguyen Van A",
          email: "newuser@example.com",
        }),
        expect.anything()
      );
      expect(toast.success).toHaveBeenCalledWith("Đăng ký tài khoản thành công!");
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("Không thể đăng ký với email đã tồn tại", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Đăng ký ngay/i));

    fireEvent.change(screen.getByLabelText(/Họ và tên/i), {
      target: { value: "Nguyen Van A" },
    });
    fireEvent.change(screen.getByLabelText(/Số điện thoại/i), {
      target: { value: "0123456789" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mật khẩu/i), {
      target: { value: "Password1!" },
    });
    fireEvent.change(screen.getByLabelText(/Nhập lại mật khẩu/i), {
      target: { value: "Password1!" },
    });

    fireEvent.click(screen.getByText(/Đăng ký/i));

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith(
        "Email này đã được sử dụng, vui lòng chọn địa chỉ email khác!"
      );
      expect(mockAddUser).not.toHaveBeenCalled();
    });
  });
});
