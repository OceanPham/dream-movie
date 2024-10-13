import React, { useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, FormFeedback, Col } from 'reactstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetALLFilm, useGetALLFilmCategoryID, useAddFilm, useGetAllSupplier } from './hook';
import useRole from '../../../../Auth/useRole';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const FormMovie = ({ parentCallback, listNameUsed }) => {
  // Schema xác thực dữ liệu
  const schema = yup.object().shape({
    categoryId: yup.object().required('Vui lòng chọn một mã thể loại'),
    supplierId: yup.object().required('Vui lòng chọn một mã nhà cung cấp'),
    name: yup.string()
      .required('Tên phim không được để trống.')
      .min(2, 'Tên phim không được ngắn hơn 2 ký tự')
      .max(50, 'Tên phim không được dài quá 50 ký tự.')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Tên phim không được phép chứa kí tự đặc biệt.')
      .test('unique', 'Tên phim đã tồn tại, vui lòng chọn tên khác.', (value) => {
        const errName = listNameUsed?.listNameUsed?.includes(value.toLowerCase());
        return !errName;
      }),
    duration: yup.number()
      .required('Thời lượng phim không được để trống')
      .positive('Thời lượng phim phải là số nguyên')
      .integer('Thời lượng phim phải là số nguyên')
      .min(40, 'Thời lượng phim phải lớn hơn hoặc bằng 40')
      .max(200, 'Thời lượng phim phải nhỏ hơn hoặc bằng 200'),
    releaseDate: yup.date()
      .required('Vui lòng chọn ngày công chiếu.')
      .min(new Date(), 'Vui lòng chọn ngày công chiếu lớn hơn hoặc bằng ngày hiện tại'),
    image: yup.mixed()
      .required('Vui lòng chọn ảnh cho phim.')
      .test('fileType', 'Vui lòng chọn một ảnh hợp lệ', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0]?.type);
      }),
    status: yup.object().required('Trạng thái của phim là bắt buộc'),
    url: yup.string().url('Vui lòng nhập đường dẫn hợp lệ').nullable(),
    summary: yup.string()
      .required('Tóm tắt phim không được để trống')
      .max(300, 'Độ dài tóm tắt phim không quá 300 ký tự'),
    age: yup.number()
      .required('Độ tuổi là bắt buộc')
      .positive('Độ tuổi phải là số nguyên dương')
      .integer('Độ tuổi phải là số nguyên'),
  });

  const { status, data: dataListCategoryId } = useGetALLFilmCategoryID();
  const { status: statusSupplier, data: dataListSupplierId } = useGetAllSupplier();
  const role = useRole();
  const { status: sttEdit, mutate: addFilm } = useAddFilm();
  const queryClient = useQueryClient();
  const [invalidName, setInvalidName] = useState('');
  const navigate = useNavigate();

  const listCategoryId = dataListCategoryId?.map((item) => {
    return { value: item.id, label: item.name };
  })
  const listSupplierId = dataListSupplierId?.map((item) => {
    return { value: item.id, label: item.name };
  })
  const { register, watch, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  //Theo dõi sự thay đổi của categoryId
  // const categoryId = watch('categoryId')
  // console.log('categoryId: ', categoryId);
  // console.log('typeof categoryId: ', typeof (categoryId));

  const onSubmit = (data) => {
    // Them log kiem tra du lieu
    console.log(data);

    if (role !== 'admin') {
      toast.error('Bạn không được phân quyền thêm phim!');
      return;
    }

    const db_submit = {
      categoryId: data.categoryId.value,
      supplierId: data.supplierId.value,
      name: data.name.trim(),
      duration: data.duration,
      releaseDate: data.releaseDate,
      image: data.image[0],
      status: data.status.value,
      url: data.url,
      summary: data.summary.trim(),
      age: data.age,
    };
    const errName = listNameUsed?.listNameUsed?.includes(db_submit.name.toLowerCase());
    if (errName) {
      toast.error('Tên phim đã tồn tại, vui lòng chọn tên khác.');
      return false;
    }
    setInvalidName('');

    console.log('db_submit: ', db_submit);

    addFilm(db_submit, {
      onSuccess: () => {
        toast.success("Thêm phim thành công");
        setTimeout(() => {
          navigate("/manager/movie");
          parentCallback();
          queryClient.invalidateQueries('film');
        }, 3000);
      },
      onError: () => toast.error('Thêm phim không thành công'),
    })
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="categoryId">Mã thể loại</Label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={listCategoryId}
                  placeholder="Chọn mã thể loại"
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                />
              )}
            />
            {errors.categoryId && (
              <span className='errors'>{errors.categoryId.message}</span>
            )}
          </FormGroup>


          {/* <FormGroup>
            <Label for="categoryId">Mã thể loại</Label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={listCategoryId}
                  placeholder="Chọn mã thể loại"
                />
              )}
            />
            {errors.categoryId && (
              <span className='errors'>{errors.categoryId.message}</span>
            )}
          </FormGroup> */}

          <FormGroup>
            <Label for="supplierId">Mã nhà cung cấp</Label>
            <Controller
              name="supplierId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={listSupplierId}
                  placeholder="Chọn mã nhà cung cấp"
                />
              )}
            />
            {errors.supplierId && (
              <span className='errors'>{errors.supplierId.message}</span>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="name">Tên phim</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input
                {...field}
                placeholder="Nhập vào tên phim"
              />}
            />
            {errors.name && (
              <span className='errors'>{errors.name.message}</span>
            )}

          </FormGroup>


          {/* <FormGroup>
            <Label for="name">Tên phim</Label>
            <Input
              id="name"
              name="name"
              {...register('name')} // Đảm bảo rằng bạn truyền chính xác
              invalid={errors.name ? true : false}
            />
            {errors.name && (
              <span className='errors'>{errors.name.message}</span>
            )}
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </FormGroup> */}

          <FormGroup>
            <Label for="duration">Thời lượng (phút)</Label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => <Input
                {...field}
                type='number'
                placeholder="Nhập vào thời lượng phim"
              />}
            />
            {errors.duration && (
              <span className='errors'>{errors.duration.message}</span>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="releaseDate">Ngày công chiếu</Label>
            <Controller
              name="releaseDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Chọn ngày công chiếu"
                />
              )}
            />
            {errors.releaseDate && (
              <span className='errors'>{errors.releaseDate.message}</span>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="image">Ảnh phim</Label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => <Input
                {...field}
                type='file'
                placeholder="Chọn ảnh phim"
              />}
            />

            {errors.image && (
              <span className='errors'>{errors.image.message}</span>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="status">Trạng thái của phim</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: 'active', label: 'Hoạt động' },
                    { value: 'cancelled', label: 'Đã hủy' },
                    { value: 'postponed', label: 'Tạm hoãn' }
                  ]}
                  placeholder="Chọn trạng thái"
                />
              )}
            />
            {errors.status && (
              <span className='errors'>{errors.status.message}</span>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="url">Đường dẫn</Label>
            <Controller
              name="url"
              control={control}
              render={({ field }) => <Input
                {...field}
                placeholder="Nhập đường dẫn"
              />}
            />
            {errors.url && (
              <span className='errors'>{errors.url.message}</span>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="summary">Tóm tắt</Label>
            <Controller
              name="summary"
              control={control}
              render={({ field }) => <Input
                {...field}
                placeholder="Tóm tắt về bộ phim"
              />}
            />

            {errors.summary && (
              <span className='errors'>{errors.summary.message}</span>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="age">Độ tuổi</Label>
            <Controller
              name="age"
              control={control}
              render={({ field }) => <Input
                {...field}
                type='number'
                placeholder="Chọn độ tuổi được phép xem phim"
              />}
            />

            {errors.age && (
              <span className='errors'>{errors.age.message}</span>
            )}
          </FormGroup>

          <Button type="submit" color="primary">Thêm</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default FormMovie;