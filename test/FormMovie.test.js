import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Đảm bảo import đúng matcher
import FormMovie from '../src/views/pages/Managers/movie/FormMovie';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAddFilm, useGetALLFilmCategoryID } from '../src/views/pages/Managers/movie/hook';
import { toast } from 'react-toastify';
import selectEvent from 'react-select-event';

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

jest.mock('../src/views/pages/Managers/movie/hook', () => ({
    useAddFilm: jest.fn(() => ({
        status: 'idle',
        mutate: jest.fn((data, { onSuccess }) => {
            console.log('Mocked mutate called with data:', data); // Log dữ liệu
            onSuccess(); // Gọi onSuccess để giả lập việc submit thành công
        }),
    })),
    useGetALLFilmCategoryID: jest.fn(() => ({
        data: [],
        isLoading: true,
    })),
    useGetAllSupplier: jest.fn(() => ({
        data: [],
        isLoading: true,
    })),
}));

jest.mock('../src/views/pages/Managers/movie/hook', () => ({
    useAddFilm: jest.fn(() => ({
        status: 'idle',
        mutate: jest.fn((data, { onSuccess }) => {
            console.log('Mocked mutate called with data:', data); // Log dữ liệu
            onSuccess(); // Gọi onSuccess để giả lập việc submit thành công
        }),
    })),
    useGetALLFilmCategoryID: jest.fn(() => ({
        data: [],
        isLoading: true,
    })),
    useGetAllSupplier: jest.fn(() => ({
        data: [],
        isLoading: true,
    })),
}));




jest.mock('../src/Auth/useRole', () => jest.fn(() => 'admin')); // Giả lập quyền admin


const errNotice = {
    "9E.1": "Vui lòng chọn một mã thể loại.",
    "9E.2": "Vui lòng chọn một mã nhà cung cấp.",
    "9E.3": "Tên phim không được để trống.",
    "9E.4": "Tên phim không được dài quá 50 ký tự.",
    "9E.5": "Tên phim không được ngắn hơn 2 ký tự.",
    "9E.6": "Tên phim đã tồn tại, vui lòng chọn tên khác.",
    "9E.7": "Tên phim không được phép chứa kí tự đặc biệt.",
    "9E.8": "Thời lượng phim không được để trống.",
    "9E.9": "Thời lượng phim phải là số nguyên dương.",
    "9E.10": "Thời lượng phim phải lớn hơn hoặc bằng 40.",
    "9E.11": "Thời lượng phim phải nhỏ hơn hoặc bằng 200.",
    "9E.12": "Vui lòng chọn ảnh cho phim.",
    "9E.13": "Vui lòng chọn một ảnh hợp lệ.",
    "9E.14": "Tóm tắt phim không được để trống.",
    "9E.15": "Độ dài tóm tắt phim không quá 300 ký tự.",
    "9E.16": "Vui lòng chọn ngày công chiếu.",
    "9E.17": "Vui lòng chọn ngày công chiếu lớn hơn hoặc bằng ngày hiện tại.",
    "9E.18": "Vui lòng nhập đường dẫn trailer.",
    "9E.19": "Vui lòng nhập đường dẫn hợp lệ.",
    "9E.20": "Bạn không được phân quyền thêm phim!"
};

const mockMutate = jest.fn();
useAddFilm.mockReturnValue({
    mutate: mockMutate,
    status: 'idle',
});
describe('FormMovie', () => {
    const parentCallback = jest.fn();
    const listNameUsed = {
        listNameUsed: ['film1', 'film2'] // Tên loại thực phẩm đã được sử dụng
    };

    const setup = () => {
        const queryClient = new QueryClient(); // Tạo QueryClient mới
        return render(
            <QueryClientProvider client={queryClient}> {/* Bọc component với QueryClientProvider */}
                <Router>
                    <FormMovie parentCallback={parentCallback} listNameUsed={listNameUsed} />
                </Router>
            </QueryClientProvider>
        );
    };

    test('func check movie null (TC 3)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên phim');
        const durationInput = screen.getByPlaceholderText('Nhập vào thời lượng phim');
        const summaryInput = screen.getByPlaceholderText('Tóm tắt về bộ phim');
        const releaseDateInput = screen.getByPlaceholderText('Chọn ngày công chiếu');
        const trailerInput = screen.getByPlaceholderText('Nhập đường dẫn');
        const imageInput = screen.getByTestId('image');
        // const categorySelect = screen.getByLabelText('Mã thể loại');
        // const supplierSelect = screen.getByTestId('supplier');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.change(durationInput, { target: { value: '120' } });
        fireEvent.change(summaryInput, { target: { value: 'Very excited' } });
        fireEvent.change(releaseDateInput, { target: { value: '02/02/2024' } });
        fireEvent.change(trailerInput, { target: { value: 'https://abc' } });
        fireEvent.change(imageInput, { target: { files: [] } });
        // fireEvent.change(categorySelect, { target: { value: '' } });
        // fireEvent.change(supplierSelect, { target: { value: '' } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Thêm'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['9E.3'])).toBeInTheDocument();
        // expect(screen.getByText(/Thời lượng phim không được để trống/i)).toBeInTheDocument();
        // expect(screen.getByText((content, element) => content.includes('Tóm tắt phim không được để trống'))).toBeInTheDocument();
        // expect(await screen.findByText(errNotice['9E.16'])).toBeInTheDocument();
    });

    test('func check movie null (TC 4)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên phim');
        const durationInput = screen.getByPlaceholderText('Nhập vào thời lượng phim');
        const summaryInput = screen.getByPlaceholderText('Tóm tắt về bộ phim');
        const releaseDateInput = screen.getByPlaceholderText('Chọn ngày công chiếu');
        const trailerInput = screen.getByPlaceholderText('Nhập đường dẫn');
        const imageInput = screen.getByTestId('image');
        // const categorySelect = screen.getByLabelText('Mã thể loại');
        // const supplierSelect = screen.getByTestId('supplier');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.change(durationInput, { target: { value: '120' } });
        fireEvent.change(summaryInput, { target: { value: 'Very excited' } });
        fireEvent.change(releaseDateInput, { target: { value: '02/02/2024' } });
        fireEvent.change(trailerInput, { target: { value: 'https://abc' } });
        fireEvent.change(imageInput, { target: { files: [] } });
        // fireEvent.change(categorySelect, { target: { value: '' } });
        // fireEvent.change(supplierSelect, { target: { value: '' } });

        // Bấm nút "Lưu" mà không nhập bất kỳ dữ liệu nào
        fireEvent.click(screen.getByText('Thêm'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['9E.3'])).toBeInTheDocument();
        // expect(screen.getByText(/Thời lượng phim không được để trống/i)).toBeInTheDocument();
        // expect(screen.getByText((content, element) => content.includes('Tóm tắt phim không được để trống'))).toBeInTheDocument();
        // expect(await screen.findByText(errNotice['9E.16'])).toBeInTheDocument();
    });

    test('func check movie null (TC 5)', async () => {
        setup();
    
        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên phim');
        const durationInput = screen.getByPlaceholderText('Nhập vào thời lượng phim');
        const summaryInput = screen.getByPlaceholderText('Tóm tắt về bộ phim');
        const releaseDateInput = screen.getByPlaceholderText('Chọn ngày công chiếu');
        const trailerInput = screen.getByPlaceholderText('Nhập đường dẫn');
        const imageInput = screen.getByTestId('image');
    
        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: 'A' } });
        fireEvent.change(durationInput, { target: { value: '120' } });
        fireEvent.change(summaryInput, { target: { value: 'Very excited' } });
        fireEvent.change(releaseDateInput, { target: { value: '02/02/2024' } });
        fireEvent.change(trailerInput, { target: { value: 'https://abc' } });
        fireEvent.change(imageInput, { target: { files: [] } });
    
        // Bấm nút "Lưu"
        fireEvent.click(screen.getByText('Thêm'));
    
        // Sử dụng hàm matcher để kiểm tra một phần chuỗi
        expect(await screen.findByText((content, element) => 
            content.includes('Tên phim không được ngắn hơn 2 ký tự'))
        ).toBeInTheDocument();
    });
    

    test('func check movie null (TC 6)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên phim');
        const durationInput = screen.getByPlaceholderText('Nhập vào thời lượng phim');
        const summaryInput = screen.getByPlaceholderText('Tóm tắt về bộ phim');
        const releaseDateInput = screen.getByPlaceholderText('Chọn ngày công chiếu');
        const trailerInput = screen.getByPlaceholderText('Nhập đường dẫn');
        const imageInput = screen.getByTestId('image');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: 'A very long movie name that exceeds fifty characters in length' } });
        fireEvent.change(durationInput, { target: { value: '120' } });
        fireEvent.change(summaryInput, { target: { value: 'Very excited' } });
        fireEvent.change(releaseDateInput, { target: { value: '02/02/2024' } });
        fireEvent.change(trailerInput, { target: { value: 'https://abc' } });
        fireEvent.change(imageInput, { target: { files: [] } });

        // Bấm nút "Lưu"
        fireEvent.click(screen.getByText('Thêm'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['9E.4'])).toBeInTheDocument();
    });

    test('func check movie null (TC 7)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên phim');
        const durationInput = screen.getByPlaceholderText('Nhập vào thời lượng phim');
        const summaryInput = screen.getByPlaceholderText('Tóm tắt về bộ phim');
        const releaseDateInput = screen.getByPlaceholderText('Chọn ngày công chiếu');
        const trailerInput = screen.getByPlaceholderText('Nhập đường dẫn');
        const imageInput = screen.getByTestId('image');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: 'Film@123' } });
        fireEvent.change(durationInput, { target: { value: '120' } });
        fireEvent.change(summaryInput, { target: { value: 'Very excited' } });
        fireEvent.change(releaseDateInput, { target: { value: '02/02/2024' } });
        fireEvent.change(trailerInput, { target: { value: 'https://abc' } });
        fireEvent.change(imageInput, { target: { files: [] } });

        // Bấm nút "Lưu"
        fireEvent.click(screen.getByText('Thêm'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['9E.7'])).toBeInTheDocument();
    });

    test('func check movie null (TC 8)', async () => {
        setup();

        // Setup dữ liệu demo cho các trường
        const nameInput = screen.getByPlaceholderText('Nhập vào tên phim');
        const durationInput = screen.getByPlaceholderText('Nhập vào thời lượng phim');
        const summaryInput = screen.getByPlaceholderText('Tóm tắt về bộ phim');
        const releaseDateInput = screen.getByPlaceholderText('Chọn ngày công chiếu');
        const trailerInput = screen.getByPlaceholderText('Nhập đường dẫn');
        const imageInput = screen.getByTestId('image');

        // Nhập dữ liệu vào các trường input sử dụng fireEvent.change
        fireEvent.change(nameInput, { target: { value: 'Film1' } });
        fireEvent.change(durationInput, { target: { value: '120' } });
        fireEvent.change(summaryInput, { target: { value: 'Very excited' } });
        fireEvent.change(releaseDateInput, { target: { value: '02/02/2024' } });
        fireEvent.change(trailerInput, { target: { value: 'https://abc' } });
        fireEvent.change(imageInput, { target: { files: [] } });

        // Bấm nút "Lưu"
        fireEvent.click(screen.getByText('Thêm'));

        // Kiểm tra các thông báo lỗi validate
        expect(await screen.findByText(errNotice['9E.6'])).toBeInTheDocument();
    });
});
