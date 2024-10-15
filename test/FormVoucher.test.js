import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormVoucher from '../src/views/pages/Managers/Voucher/FormVoucher';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { toast } from 'react-toastify';

afterEach(() => {
    cleanup(); // Dọn dẹp sau mỗi test
});

// Mock hàm toast
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const mockParentCallback = jest.fn();

const setup = () => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <Router>
                <FormVoucher parentCallback={mockParentCallback} />
            </Router>
        </QueryClientProvider>
    );
};

describe('FormVoucher', () => {
    test('renders form and validates required fields', async () => {
        setup();

        fireEvent.click(screen.getByText('Thêm'));

        expect(await screen.findByText('Tên đăng nhập nhân viên không được để trống.')).toBeInTheDocument();
        expect(await screen.findByText('Vui lòng nhập tên của mã giảm giá.')).toBeInTheDocument();
        expect(await screen.findByText('Vui lòng nhập tỉ lệ chiết khấu.')).toBeInTheDocument();
        expect(await screen.findByText('Vui lòng nhập hạn mức.')).toBeInTheDocument();
        expect(await screen.findByText('Vui lòng chọn tình trạng mã giảm giá.')).toBeInTheDocument();
        expect(await screen.findByText('Vui lòng chọn ngày tạo.')).toBeInTheDocument();
        expect(await screen.findByText('Vui lòng chọn hạn dùng.')).toBeInTheDocument();
    });

    test('validates employeeName format', async () => {
        setup();
        fireEvent.change(screen.getByPlaceholderText('Nhập vào tên đăng nhập nhân viên'), { target: { value: '1234' } });
        fireEvent.click(screen.getByText('Thêm'));
        expect(await screen.findByText('Tên đăng nhập nhân viên phải bắt đầu bằng chữ và bao gồm chữ và số.')).toBeInTheDocument();
    });

    test('validates voucherCode format', async () => {
        setup();
        fireEvent.change(screen.getByPlaceholderText('Nhập vào mã giảm giá'), { target: { value: '12345!' } });
        fireEvent.click(screen.getByText('Thêm'));
        expect(await screen.findByText('Mã giảm giá chỉ được chứa chữ và số, không có ký tự đặc biệt.')).toBeInTheDocument();
    });

    test('validates discountRate range', async () => {
        setup();
        fireEvent.change(screen.getByPlaceholderText('Nhập vào tỉ lệ chiết khấu'), { target: { value: '100' } });
        fireEvent.click(screen.getByText('Thêm'));
        expect(await screen.findByText('Tỉ lệ chiết khấu phải trong khoảng từ 5-50%.')).toBeInTheDocument();
    });

    test('validates usageLimit range', async () => {
        setup();
        fireEvent.change(screen.getByPlaceholderText('Nhập vào hạn mức'), { target: { value: '4000000' } });
        fireEvent.click(screen.getByText('Thêm'));
        expect(await screen.findByText('Hạn mức phải từ 5,000,000 đến 15,000,000 VNĐ.')).toBeInTheDocument();
    });

    test('validates createdAt and expiryDate', async () => {
        setup();
        // Chọn ngày tạo và hạn dùng không hợp lệ
        fireEvent.click(screen.getByRole('textbox', { name: /Ngày tạo/i }));
        fireEvent.change(screen.getByRole('textbox', { name: /Ngày tạo/i }), { target: { value: '2024-10-15' } });
        fireEvent.click(screen.getByRole('textbox', { name: /Hạn dùng/i }));
        fireEvent.change(screen.getByRole('textbox', { name: /Hạn dùng/i }), { target: { value: '2024-10-15' } });
        fireEvent.click(screen.getByText('Thêm'));

        expect(await screen.findByText('Hạn dùng phải sau ngày tạo ít nhất 1 giờ.')).toBeInTheDocument();
    });

    test('submits form successfully', async () => {
        setup();
        // Nhập dữ liệu hợp lệ vào form
        fireEvent.change(screen.getByPlaceholderText('Nhập vào tên đăng nhập nhân viên'), { target: { value: 'JohnDoe' } });
        fireEvent.change(screen.getByPlaceholderText('Nhập vào mã giảm giá'), { target: { value: 'VOUCHER2024' } });
        fireEvent.change(screen.getByPlaceholderText('Nhập vào tỉ lệ chiết khấu'), { target: { value: '10' } });
        fireEvent.change(screen.getByPlaceholderText('Nhập vào hạn mức'), { target: { value: '10000000' } });
        fireEvent.change(screen.getByLabelText('Tình Trạng'), { target: { value: 'active' } });
        fireEvent.change(screen.getByRole('textbox', { name: /Ngày tạo/i }), { target: { value: '2024-10-15' } });
        fireEvent.change(screen.getByRole('textbox', { name: /Hạn dùng/i }), { target: { value: '2024-10-16' } });

        fireEvent.click(screen.getByText('Thêm'));

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Form submitted successfully');
        });
    });
});
