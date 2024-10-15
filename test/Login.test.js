import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Login from '../src/Auth/Login'; // Đường dẫn tới file Login của bạn
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup(); // Dọn dẹp sau mỗi test
});

describe('Login Component', () => {
  const setup = () => {
    const queryClient = new QueryClient(); // Tạo QueryClient mới
    return render(
      <QueryClientProvider client={queryClient}> {/* Bọc component với QueryClientProvider */}
        <Router>
          <Login />
        </Router>
      </QueryClientProvider>
    );
  };

  test('renders login form with correct text', () => {
    setup();

    // Kiểm tra các văn bản trong component Login
    expect(screen.getByText('Đăng nhập vào Dream Movie')).toBeInTheDocument();
    // expect(screen.getByLabelText('Tên đăng nhập (Email)')).toBeInTheDocument();
    // expect(screen.getByLabelText('Mật khẩu')).toBeInTheDocument();
  });
});
