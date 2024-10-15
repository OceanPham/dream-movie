import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TableChairCategory from '../src/views/pages/Managers/ChairCategory/TableChairCategory'; // Đường dẫn tới file component TableChairCategory
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import { useDeleteChairCategory, useGetALLChairCategory } from '../src/views/pages/Managers/ChairCategory/hook'; // Điều chỉnh đường dẫn

jest.mock('../src/Auth/useRole', () => jest.fn(() => 'admin')); // Giả lập quyền admin

jest.mock('../src/views/pages/Managers/ChairCategory/hook', () => ({
    useGetALLChairCategory: jest.fn(() => ({
        data: [
            { id: '1', name: 'VIP', price: 100000, seatCount: 10, updatedAt: '2024-10-14' },
            { id: '2', name: 'Standard', price: 50000, seatCount: 20, updatedAt: '2024-10-13' }
        ],
        status: 'success'
    })),
    useDeleteChairCategory: jest.fn(() => ({
        mutate: jest.fn(),
    })),
}));

// Mock `SweetAlert2` và `withReactContent`
jest.mock('sweetalert2', () => ({
    fire: jest.fn(() => Promise.resolve({ isConfirmed: true })), // Đảm bảo nó trả về isConfirmed: true
}));


jest.mock('sweetalert2-react-content', () => () => ({
    fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

const setup = () => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <Router>
                <TableChairCategory />
            </Router>
        </QueryClientProvider>
    );
};

test('deletes a chair category successfully', async () => {
    setup();

    const deleteButton = screen.getAllByText('Xóa')[0]; // Lấy nút "Xóa" đầu tiên
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    // Chờ SweetAlert được gọi
    await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalled();
    });

    // Xác nhận rằng mutation để xóa đã được gọi
    const { mutate } = require('../src/views/pages/Managers/ChairCategory/hook').useDeleteChairCategory();
    expect(mutate).toHaveBeenCalledWith('1', expect.any(Object));
});

// test('deletes a chair category successfully2', async () => {
//     setup();

//     const deleteButton = screen.getAllByText('Xóa')[0]; // Lấy nút "Xóa" đầu tiên
//     expect(deleteButton).toBeInTheDocument();

//     console.log('Delete button found and about to be clicked');

//     fireEvent.click(deleteButton);

//     console.log('Delete button clicked, awaiting SweetAlert');

//     // Chờ SweetAlert được gọi
//     await waitFor(() => {
//         console.log(Swal.fire.mock.calls); // In ra các lệnh gọi tới Swal.fire để kiểm tra
//         expect(Swal.fire).toHaveBeenCalled();
//     });

//     // Xác nhận rằng mutation để xóa đã được gọi
//     const { mutate } = require('../src/views/pages/Managers/ChairCategory/hook').useDeleteChairCategory();
//     expect(mutate).toHaveBeenCalledWith('1', expect.any(Object));
// });

