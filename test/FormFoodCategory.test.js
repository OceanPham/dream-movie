import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Đảm bảo import đúng matcher
import FormFoodCategory from '../src/views/pages/Managers/FoodCategory/FormFoodCategory';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAddFoodCategory } from '../src/views/pages/Managers/FoodCategory/hook';
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

jest.mock('../src/views/pages/Managers/FoodCategory/hook', () => ({
    useAddFoodCategory: jest.fn(() => ({
        status: 'idle',
        mutate: jest.fn((data, { onSuccess }) => {
            console.log('Mocked mutate called with data:', data); // Log dữ liệu
            onSuccess(); // Gọi onSuccess để giả lập việc submit thành công
        }),
    })),
}));




jest.mock('../src/Auth/useRole', () => jest.fn(() => 'admin')); // Giả lập quyền admin


const errNotice = {
    "7E.1": "Tên loại thực phẩm không được để trống.",
    "7E.2": "Tên loại thực phẩm không được dài quá 50 ký tự.",
    "7E.3": "Tên loại thực phẩm phải có ít nhất 3 ký tự.",
    "7E.4": "Tên loại thực phẩm không được bắt đầu bằng số.",
    "7E.5": "Tên loại thực phẩm đã tồn tại, vui lòng chọn tên khác.",
    "7E.6": "Tên loại thực phẩm không được phép chứa kí tự đặc biệt.",
    "7E.7": "Mô tả loại thực phẩm không được vượt quá 300 ký tự.",
    "7E.8": "Mô tả loại thực phẩm không được để trống",
    "7E.9": "Số lượng tồn kho tối đa không được để trống.",
    "7E.10": "Số lượng phải là số nguyên, vui lòng nhập lại!",
    "7E.11": "Số lượng phải lớn hơn 0.",
    "7E.12": "Bạn không được phân quyền thêm loại thực phẩm!"
};

const mockMutate = jest.fn();
useAddFoodCategory.mockReturnValue({
    mutate: mockMutate,
    status: 'idle',
});
describe('FormFoodCategory', () => {
    const parentCallback = jest.fn();
    const listNameUsed = {
        listNameUsed: ['vip', 'normal'] // Tên loại thực phẩm đã được sử dụng
    };

    const setup = () => {
        const queryClient = new QueryClient(); // Tạo QueryClient mới
        return render(
            <QueryClientProvider client={queryClient}> {/* Bọc component với QueryClientProvider */}
                <Router>
                    <FormFoodCategory parentCallback={parentCallback} listNameUsed={listNameUsed} />
                </Router>
            </QueryClientProvider>
        );
    };

    test('func check foodCategory null (TC 3)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên loại thực phẩm');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại thực phẩm');
        const max_stock_quatityInput = screen.getByPlaceholderText('Nhập vào số lượng tồn kho tối đa');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: 'Ve' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại thực phẩm cao cấp' } });
        fireEvent.change(max_stock_quatityInput, { target: { value: '1500' } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['7E.3'])).toBeInTheDocument();
    });

    test('func check foodCategory start with number (TC 4)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên loại thực phẩm');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại thực phẩm');
        const max_stock_quatityInput = screen.getByPlaceholderText('Nhập vào số lượng tồn kho tối đa');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: '12Vegetable' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại thực phẩm cao cấp với nhiều tiện nghi.' } });
        fireEvent.change(max_stock_quatityInput, { target: { value: '150000' } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['7E.4'])).toBeInTheDocument();
    });

    test('func check foodCategory is Used (TC 5)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên loại thực phẩm');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại thực phẩm');
        const max_stock_quatityInput = screen.getByPlaceholderText('Nhập vào số lượng tồn kho tối đa');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: 'vip' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại thực phẩm cao cấp với nhiều tiện nghi.' } });
        fireEvent.change(max_stock_quatityInput, { target: { value: '15' } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['7E.5'])).toBeInTheDocument();
    }); 

    test('func check Description have more than 300 characters (TC 7)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên loại thực phẩm');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại thực phẩm');
        const max_stock_quatityInput = screen.getByPlaceholderText('Nhập vào số lượng tồn kho tối đa');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: 'Vegetable' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại thực phẩm này được sản xuất từ những nguyên liệu tự nhiên, không chứa chất bảo quản và hóa chất độc hại. Nó cung cấp đầy đủ các dưỡng chất cần thiết cho cơ thể, giúp tăng cường sức khỏe và sức đề kháng. Sản phẩm này đã được kiểm nghiệm và chứng nhận bởi các cơ quan y tế hàng đầu, đảm bảo an toàn cho người sử dụng. Với hương vị thơm ngon và hấp dẫn, loại thực phẩm này chắc chắn sẽ làm hài lòng mọi thành viên trong gia đình bạn. Hãy sử dụng sản phẩm này hàng ngày để có một cuộc sống khỏe mạnh và tràn đầy năng lượng.' } });
        fireEvent.change(max_stock_quatityInput, { target: { value: 150000 } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['7E.7'])).toBeInTheDocument();
    });

    test('func check max_stock_quatity is not Integer Number (TC 10)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên loại thực phẩm');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại thực phẩm');
        const max_stock_quatityInput = screen.getByPlaceholderText('Nhập vào số lượng tồn kho tối đa');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: 'Vegetable' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại thực phẩm cao cấp' } });
        fireEvent.change(max_stock_quatityInput, { target: { value: 1022.4 } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['7E.10'])).toBeInTheDocument();
    });

    test('func check max_stock_quatity is smaller than 0 (TC 11)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên loại thực phẩm');
        const descriptionInput = screen.getByPlaceholderText('Nhập mô tả về loại thực phẩm');
        const max_stock_quatityInput = screen.getByPlaceholderText('Nhập vào số lượng tồn kho tối đa');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: 'Vegetable' } });
        fireEvent.change(descriptionInput, { target: { value: 'Loại thực phẩm cao cấp' } });
        fireEvent.change(max_stock_quatityInput, { target: { value: -10 } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Lưu'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['7E.11'])).toBeInTheDocument();
    });

    });