import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormShowtime from '../src/views/pages/Managers/Showtime/FormShowtime';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAddShowTime, useGetALLMovie, useGetALLCinema, useGetALLRoom, useGetALLScreeningFormat, useGetALLLanguage, useGetALLScreeningType } from '../src/views/pages/Managers/Showtime/hook';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

afterEach(() => {
    cleanup(); // Clean up after each test
});

// Mocking the hooks used in the component
jest.mock('../src/views/pages/Managers/Showtime/hook', () => ({
    useAddShowTime: jest.fn(() => ({
        status: 'idle',
        mutate: jest.fn((data, { onSuccess }) => {
            console.log('Mocked mutate called with data:', data);
            onSuccess();
        }),
    })),
    useGetALLMovie: jest.fn(() => ({
        data: [{ id: '1', name: 'Movie 1' }, { id: '2', name: 'Movie 2' }],
    })),
    useGetALLCinema: jest.fn(() => ({
        data: [{ id: '1', name: 'Cinema 1' }, { id: '2', name: 'Cinema 2' }],
    })),
    useGetALLRoom: jest.fn(() => ({
        data: [{ id: '1', name: 'Room 1' }, { id: '2', name: 'Room 2' }],
    })),
    useGetALLScreeningFormat: jest.fn(() => ({
        data: [{ id: '1', name: '2D' }, { id: '2', name: '3D' }],
    })),
    useGetALLLanguage: jest.fn(() => ({
        data: [{ id: '1', name: 'English' }, { id: '2', name: 'Vietnamese' }],
    })),
    useGetALLScreeningType: jest.fn(() => ({
        data: [{ id: '1', name: 'Regular' }, { id: '2', name: 'IMAX' }],
    })),
    useGetALLVoucher: jest.fn(() => ({
        data: [],
    })),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const errNotice = {
    "6E.1": "Vui lòng chọn một bộ phim.",
    "6E.2": "Phim bạn chọn hiện chưa được khởi chiếu.",
    "6E.3": "Vui lòng chọn thời gian bắt đầu chiếu.",
    "6E.4": "Rạp đã có lịch chiếu vào thời gian này, vui lòng chọn thời gian khác.",
    "6E.5": "Thời gian lịch chiếu xa hơn thời gian hiện tại không quá 1 tháng!",
    "6E.6": "Thời gian lịch chiếu phải sau thời gian hiện tại.",
    "6E.7": "Vui lòng chọn rạp chiếu.",
    "6E.8": "Vui lòng chọn phòng chiếu.",
    "6E.9": "Phòng bạn chọn không nằm trong rạp đã chọn, vui lòng kiểm tra lại.",
    "6E.10": "Vui lòng chọn định dạng chiếu.",
    "6E.11": "Vui lòng chọn ngôn ngữ cho phim.",
    "6E.12": "Vui lòng chọn loại suất chiếu cho phim.",
    "6E.13": "Vui lòng chọn trạng thái cho lịch chiếu.",
    "6E.14": "Lỗi phân quyền! Bạn không được phân quyền thêm lịch chiếu."
};

describe('FormShowtime', () => {
    const parentCallback = jest.fn();
    const listShowTime = [];
    let schema;

    beforeAll(() => {
        schema = Yup.object().shape({
            time_start: Yup.string()
                .required('Vui lòng chọn thời gian bắt đầu chiếu.')
                .test('max-1-month', 'Thời gian lịch chiếu xa hơn thời gian hiện tại không quá 1 tháng!', function (value) {
                    if (!value) return false;
                    const selectedDate = new Date(value);
                    const maxAllowedDate = new Date();
                    maxAllowedDate.setMonth(maxAllowedDate.getMonth() + 1);
                    return selectedDate <= maxAllowedDate;
                })
                .test('before-current', 'Thời gian lịch chiếu phải sau thời gian hiện tại.', function (value) {
                    if (!value) return false;
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    return selectedDate > currentDate;
                })
        });
    });

    afterAll(() => {
        jest.restoreAllMocks(); // Restore Date after all tests
    });
    const setup = () => {
        const queryClient = new QueryClient();
        return render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <FormShowtime parentCallback={parentCallback} listShowTime={listShowTime} />
                </Router>
            </QueryClientProvider>
        );
    };

    test('func check Cinema field is empty (TC 1)', async () => {
        setup();

        const cinema = screen.getByLabelText('Rạp chiếu *');
        const room = screen.getByLabelText('Phòng chiếu *');
        const movie = screen.getByLabelText('Phim chiếu *');
        const timeStart = screen.getByLabelText('Thời gian bắt đầu *');
        const format = screen.getByLabelText('Định dạng chiếu *');
        const language = screen.getByLabelText('Ngôn ngữ của phim *');
        const type = screen.getByLabelText('Ngôn ngữ của phim *');
        const statusShowTime = screen.getByLabelText('Trạng thái của lịch chiếu *');
        const voucher = screen.getByLabelText('Chương trình khuyến mãi');

        fireEvent.change(cinema, { target: { value: '' } });
        fireEvent.change(room, { target: { value: 1 } });
        fireEvent.change(movie, { target: { value: 1 } });
        fireEvent.change(timeStart, { target: { value: '2024/12/28 20:30' } });
        fireEvent.change(format, { target: { value: 1 } });
        fireEvent.change(language, { target: { value: 1 } });
        fireEvent.change(type, { target: { value: 1 } });
        fireEvent.change(statusShowTime, { target: { value: 1 } });
        fireEvent.change(voucher, { target: { value: 1 } });

        expect(cinema.value).toBe('');

        fireEvent.click(screen.getByText('Lưu'));
        expect(await screen.findByText(errNotice['6E.1'])).toBeInTheDocument();

    });

    test('func check Time Start field is empty (TC 3)', async () => {
        setup();

        const cinema = screen.getByLabelText('Rạp chiếu *');
        const room = screen.getByLabelText('Phòng chiếu *');
        const movie = screen.getByLabelText('Phim chiếu *');
        const timeStart = screen.getByLabelText('Thời gian bắt đầu *');
        const format = screen.getByLabelText('Định dạng chiếu *');
        const language = screen.getByLabelText('Ngôn ngữ của phim *');
        const type = screen.getByLabelText('Ngôn ngữ của phim *');
        const statusShowTime = screen.getByLabelText('Trạng thái của lịch chiếu *');
        const voucher = screen.getByLabelText('Chương trình khuyến mãi');

        fireEvent.change(cinema, { target: { value: 1 } });
        fireEvent.change(room, { target: { value: 1 } });
        fireEvent.change(movie, { target: { value: 1 } });
        fireEvent.change(timeStart, { target: { value: '' } });
        fireEvent.change(format, { target: { value: 1 } });
        fireEvent.change(language, { target: { value: 1 } });
        fireEvent.change(type, { target: { value: 1 } });
        fireEvent.change(statusShowTime, { target: { value: 1 } });
        fireEvent.change(voucher, { target: { value: 1 } });
        expect(timeStart.value).toBe('');

        fireEvent.click(screen.getByText('Lưu'));
        // Kiểm tra thông báo lỗi khi không có lựa chọn
        expect(await screen.findByText(errNotice['6E.3'])).toBeInTheDocument();

    });

    test('func check Time Start field is over 1 month (TC 5)', async () => {
        setup(); // Gọi hàm setup để render form

        // Thay đổi các giá trị trong form
        fireEvent.change(screen.getByLabelText('Rạp chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Phòng chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Phim chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Định dạng chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Ngôn ngữ của phim *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Ngôn ngữ của phim *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Trạng thái của lịch chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Chương trình khuyến mãi'), { target: { value: '1' } });

        // Tạo một ngày vượt quá 1 tháng so với hiện tại
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 2); // Đặt thời gian vượt quá 1 tháng
        const formattedFutureDate = futureDate.toISOString().split('T')[0] + ' 20:30'; // Định dạng yyyy-mm-dd hh:mm

        const data = { time_start: formattedFutureDate };
        await expect(schema.validate(data)).rejects.toThrow(errNotice['6E.5']);
    });


    test('func check Time Start field is before current (TC 6)', async () => {
        setup(); // Gọi hàm setup để render form

        // Thay đổi các giá trị trong form
        fireEvent.change(screen.getByLabelText('Rạp chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Phòng chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Phim chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Định dạng chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Ngôn ngữ của phim *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Ngôn ngữ của phim *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Trạng thái của lịch chiếu *'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Chương trình khuyến mãi'), { target: { value: '1' } });

        // Tạo một ngày vượt quá 1 tháng so với hiện tại
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() - 1); // Đặt thời gian vượt quá 1 tháng
        const formattedFutureDate = futureDate.toISOString().split('T')[0] + ' 20:30'; // Định dạng yyyy-mm-dd hh:mm

        const data = { time_start: formattedFutureDate };
        await expect(schema.validate(data)).rejects.toThrow(errNotice['6E.6']);
    });

});
