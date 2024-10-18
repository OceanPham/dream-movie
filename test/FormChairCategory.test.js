import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Đảm bảo import đúng matcher
import FormChairCategory from '../src/views/pages/Managers/ChairCategory/FormChairCategory';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAddChairCategory } from '../src/views/pages/Managers/ChairCategory/hook';
import { toast } from 'react-toastify';

afterEach(() => {
    cleanup(); // Dọn dẹp sau mỗi test
});
// Mock các hooks sử dụng trong component

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(), // Mock hàm toast.success
        error: jest.fn(),
    },
}));


jest.mock('../src/views/pages/Managers/ChairCategory/hook', () => ({
    useAddChairCategory: jest.fn(() => ({
        status: 'idle',
        mutate: jest.fn((data, { onSuccess }) => {
            console.log('Mocked mutate called with data:', data); // Log dữ liệu
            onSuccess(); // Gọi onSuccess để giả lập việc submit thành công
        }),
    })),
}));




jest.mock('../src/Auth/useRole', () => jest.fn(() => 'admin')); // Giả lập quyền admin


const errNotice = {
    "4E.1": "Tên loại ghế không được để trống.",
    "4E.2": "Tên loại ghế không được dài quá 50 ký tự.",
    "4E.3": "Tên loại ghế phải có ít nhất 3 ký tự.",
    "4E.4": "Tên loại ghế không được bắt đầu bằng số.",
    "4E.5": "Tên loại ghế đã tồn tại, vui lòng chọn tên khác.",
    "4E.6": "Tên loại ghế không được phép chứa kí tự đặc biệt.",
    "4E.7": "Mô tả loại ghế không được vượt quá 300 ký tự.",
    "4E.8": "Giá vé phải lớn hơn 0.",
    "4E.9": "Vui lòng nhập giá vé.",
    "4E.10": "Giá vé phải là số nguyên, vui lòng nhập lại!",
    "4E.11": "Số lượng tối đa phải là số nguyên, vui lòng nhập lại!",
    "4E.12": "Số lượng ghế tối đa phải lớn hơn 0.",
    "4E.13": "Số lượng ghế thuộc loại này tối đa mỗi phòng là 200.",
    "4E.14": "Vui lòng nhập số lượng ghế tối đa mỗi phòng.",
    "4E.15": "Bạn không được phân quyền thêm loại ghế!"
};

const mockMutate = jest.fn();
useAddChairCategory.mockReturnValue({
    mutate: mockMutate,
    status: 'idle',
});
describe('FormChairCategory', () => {
    const parentCallback = jest.fn();
    const listNameUsed = {
        listNameUsed: ['vip', 'normal'] // Tên loại ghế đã được sử dụng
    };

    const setup = () => {
        const queryClient = new QueryClient(); // Tạo QueryClient mới
        return render(
            <QueryClientProvider client={queryClient}> {/* Bọc component với QueryClientProvider */}
                <Router>
                    <FormChairCategory parentCallback={parentCallback} listNameUsed={listNameUsed} />
                </Router>
            </QueryClientProvider>
        );
    };

    test('func check chairCategory null (TC 3)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const chairNameInput = screen.getByPlaceholderText('Nhập vào tên loại ghế');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại ghế');
        const priceInput = screen.getByPlaceholderText('Nhập vào giá vé của loại ghế');
        const quantityInput = screen.getByPlaceholderText('Nhập vào số ghế tối đa có trong một phòng');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(chairNameInput, { target: { value: 'VP' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại ghế cao cấp với nhiều tiện nghi.' } });
        fireEvent.change(priceInput, { target: { value: '150000' } });
        fireEvent.change(quantityInput, { target: { value: '50' } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['4E.3'])).toBeInTheDocument();
    });

    test('func check chairCategory start with number (TC 4)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const chairNameInput = screen.getByPlaceholderText('Nhập vào tên loại ghế');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại ghế');
        const priceInput = screen.getByPlaceholderText('Nhập vào giá vé của loại ghế');
        const quantityInput = screen.getByPlaceholderText('Nhập vào số ghế tối đa có trong một phòng');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(chairNameInput, { target: { value: '12VP' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại ghế cao cấp với nhiều tiện nghi.' } });
        fireEvent.change(priceInput, { target: { value: '150000' } });
        fireEvent.change(quantityInput, { target: { value: '50' } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['4E.4'])).toBeInTheDocument();
    });

    test('func check chairCategory is Used (TC 5)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const chairNameInput = screen.getByPlaceholderText('Nhập vào tên loại ghế');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại ghế');
        const priceInput = screen.getByPlaceholderText('Nhập vào giá vé của loại ghế');
        const quantityInput = screen.getByPlaceholderText('Nhập vào số ghế tối đa có trong một phòng');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(chairNameInput, { target: { value: 'vip' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại ghế cao cấp với nhiều tiện nghi.' } });
        fireEvent.change(priceInput, { target: { value: '150000' } });
        fireEvent.change(quantityInput, { target: { value: '50' } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['4E.5'])).toBeInTheDocument();
    });

    test('func check Description have more than 300 characters (TC 7)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const chairNameInput = screen.getByPlaceholderText('Nhập vào tên loại ghế');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại ghế');
        const priceInput = screen.getByPlaceholderText('Nhập vào giá vé của loại ghế');
        const quantityInput = screen.getByPlaceholderText('Nhập vào số ghế tối đa có trong một phòng');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(chairNameInput, { target: { value: 'vip Z' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại ghế này được thiết kế với chất liệu da cao cấp, mang lại cảm giác thoải mái và sang trọng cho người sử dụng. Ghế có khả năng ngả lưng linh hoạt, tích hợp tính năng massage nhẹ, tạo sự thư giãn tối đa trong suốt thời gian dài ngồi. Hệ thống điều chỉnh độ cao hiện đại phù hợp với mọi chiều cao người dùng.' } });
        fireEvent.change(priceInput, { target: { value: 150000 } });
        fireEvent.change(quantityInput, { target: { value: 50 } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['4E.7'])).toBeInTheDocument();
    });

    test('func check ticketPrice is not Integer Number (TC 9)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const chairNameInput = screen.getByPlaceholderText('Nhập vào tên loại ghế');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại ghế');
        const priceInput = screen.getByPlaceholderText('Nhập vào giá vé của loại ghế');
        const quantityInput = screen.getByPlaceholderText('Nhập vào số ghế tối đa có trong một phòng');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(chairNameInput, { target: { value: 'vip Z' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại ghế này được thiết kế với chất liệu da cao cấp.' } });
        fireEvent.change(priceInput, { target: { value: 1022.4 } });
        fireEvent.change(quantityInput, { target: { value: 50 } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['4E.10'])).toBeInTheDocument();
    });

    test('func check ticketPrice is smaller than 0 (TC 10)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const chairNameInput = screen.getByPlaceholderText('Nhập vào tên loại ghế');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại ghế');
        const priceInput = screen.getByPlaceholderText('Nhập vào giá vé của loại ghế');
        const quantityInput = screen.getByPlaceholderText('Nhập vào số ghế tối đa có trong một phòng');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(chairNameInput, { target: { value: 'VIP4' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại ghế sofa' } });
        fireEvent.change(priceInput, { target: { value: -1000 } });
        fireEvent.change(quantityInput, { target: { value: 50 } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['4E.8'])).toBeInTheDocument();
    });

    test('func check maxSeats is not Integer Number (TC 12)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const chairNameInput = screen.getByPlaceholderText('Nhập vào tên loại ghế');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại ghế');
        const priceInput = screen.getByPlaceholderText('Nhập vào giá vé của loại ghế');
        const quantityInput = screen.getByPlaceholderText('Nhập vào số ghế tối đa có trong một phòng');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(chairNameInput, { target: { value: 'VIP4' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại ghế sofa' } });
        fireEvent.change(priceInput, { target: { value: 30000 } });
        fireEvent.change(quantityInput, { target: { value: 100.5 } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['4E.11'])).toBeInTheDocument();
    });

    test('func check maxSeats is lager than 200 (TC 13)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const chairNameInput = screen.getByPlaceholderText('Nhập vào tên loại ghế');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại ghế');
        const priceInput = screen.getByPlaceholderText('Nhập vào giá vé của loại ghế');
        const quantityInput = screen.getByPlaceholderText('Nhập vào số ghế tối đa có trong một phòng');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(chairNameInput, { target: { value: 'VIP4' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại ghế sofa' } });
        fireEvent.change(priceInput, { target: { value: 30000 } });
        fireEvent.change(quantityInput, { target: { value: 300 } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['4E.13'])).toBeInTheDocument();
    });






});
