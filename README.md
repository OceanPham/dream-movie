# Luồng hoạt động:
### 1. Trong AppRoute: Chứa route đến phần bài làm, bao gồm path và component chứa thư mục bài làm

Ví dụ:
```jsx
<Route
    path="/manager/movie/:alias"
    element={
        <PrivateRoute>
            <Movie setSelectedKey={setSelectedKey} />
        </PrivateRoute>
    }
/>
```

### 2. Tiếp theo, component chứa thư mục sẽ tự động điều hướng đến index.jsx của thư mục đó, nơi sẽ gọi đến component `table`

### 3. Component `table` gọi đến 2 component con là `Filter (listNameUsed)` lọc các phim sau khi xóa và chứa nút thêm dữ liệu mới, và `Form (parentCallBack)` hiển thị 1 form canvas chứa các trường để thêm dữ liệu

# Cấu trúc mỗi thư mục làm:

## index.jsx

Ví dụ
```jsx
const Checkout = ({ setSelectedKey }) => {
  setSelectedKey('id_movie')
  return (
    <Fragment>
      <TableMovie />
    </Fragment>
  )
}
export default Checkout
```

- `setSelectedKey` là hàm để set key để điều hướng bằng navigate trong `MainLayout` 
- `Table` là component chứa `Filter` và `Form`

## Table.jsx
- Component chính chứa `Filter` và `Form`

## Filter.jsx
- Component chứa `listNameUsed` để lọc dữ liệu và nút thêm mới

## Form.jsx
- Component chứa form để thêm mới dữ liệu
