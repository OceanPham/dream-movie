import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Logout from '../src/Auth/Logout'; // Đường dẫn tới file Logout của bạn
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // Đảm bảo import đúng matcher

afterEach(() => {
  cleanup(); // Dọn dẹp sau mỗi test
});

describe('Login Component', () => {
  const setup = () => {
    const queryClient = new QueryClient(); // Tạo QueryClient mới
    return render(
      <QueryClientProvider client={queryClient}> {/* Bọc component với QueryClientProvider */}
        <Router>
          <Logout />
        </Router>
      </QueryClientProvider>
    );
  };

  test('renders login form with correct text', () => {
    setup();

    // Kiểm tra các văn bản trong component Login
    expect(screen.getByText('Đăng nhập vào Dream Movie')).toBeInTheDocument();
  });

  test('shows validation errors when submitting without username or password', async () => {
    setup();

    // Leave the username field empty and trigger form submission
    fireEvent.change(screen.getByPlaceholderText('Tên đăng nhập'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Lưu'));

    // Use a more flexible text matcher
    expect(await screen.findByText((content) => content.includes('Vui lòng nhập tên đăng nhập!'))).toBeInTheDocument();
  });


  test('does not show validation errors when username and password are provided', async () => {
    setup();

    // Nhập tên đăng nhập và mật khẩu
    fireEvent.change(screen.getByPlaceholderText('Tên đăng nhập'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Mật khẩu'), {
      target: { value: 'password123' }
    });

    // Click button "Lưu"
    fireEvent.click(screen.getByText('Lưu'));

    // Kiểm tra rằng không có thông báo lỗi nào được hiển thị
    expect(screen.queryByText('Vui lòng nhập tên đăng nhập!')).toBeNull();
    expect(screen.queryByText('Vui lòng nhập Mật khẩu!')).toBeNull();
  });

});
