import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetALLFilm, useGetALLFilmCategoryID } from './hook';
import useRole from '../../../../Auth/useRole';
import { toast } from 'react-toastify';

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
  const role = useRole();

  const listCategoryId = dataListCategoryId?.map((item) => {
    return { value: item.id, label: item.name };
  })
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {
    // Them log kiem tra du lieu
    console.log(data);
    console.log("Is data an object? ", typeof data === 'object');
    
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
    parentCallback(db_submit);
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
                />
              )}
            />
            {errors.categoryId && <FormFeedback>{errors.categoryId.message}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="supplierId">Mã nhà cung cấp</Label>
            <Controller
              name="supplierId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={listNameUsed.suppliers}
                  placeholder="Chọn mã nhà cung cấp"
                />
              )}
            />
            {errors.supplierId && <FormFeedback>{errors.supplierId.message}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="name">Tên phim</Label>
            <Input
              id="name"
              name="name"
              {...register('name')}
              invalid={errors.name ? true : false}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="duration">Thời lượng (phút)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              {...register('duration')}
              invalid={errors.duration ? true : false}
            />
            {errors.duration && <FormFeedback>{errors.duration.message}</FormFeedback>}
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
            {errors.releaseDate && <FormFeedback>{errors.releaseDate.message}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="image">Ảnh phim</Label>
            <Input
              id="image"
              name="image"
              type="file"
              {...register('image')}
              invalid={errors.image ? true : false}
            />
            {errors.image && <FormFeedback>{errors.image.message}</FormFeedback>}
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
            {errors.status && <FormFeedback>{errors.status.message}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="url">Đường dẫn</Label>
            <Input
              id="url"
              name="url"
              {...register('url')}
              invalid={errors.url ? true : false}
            />
            {errors.url && <FormFeedback>{errors.url.message}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="summary">Tóm tắt</Label>
            <Input
              id="summary"
              name="summary"
              type="textarea"
              {...register('summary')}
              invalid={errors.summary ? true : false}
            />
            {errors.summary && <FormFeedback>{errors.summary.message}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="age">Độ tuổi</Label>
            <Input
              id="age"
              name="age"
              type="number"
              {...register('age')}
              invalid={errors.age ? true : false}
            />
            {errors.age && <FormFeedback>{errors.age.message}</FormFeedback>}
          </FormGroup>

          <Button type="submit" color="primary">Thêm</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default FormMovie;