import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useAddFilm } from './hook';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Schema xác thực dữ liệu
const schema = yup.object().shape({
  categoryId: yup.string().required('Mã thể loại là bắt buộc'),
  supplierId: yup.string().required('Mã nhà cung cấp là bắt buộc'),
  name: yup.string()
    .required('Tên phim là bắt buộc')
    .max(50, 'Tên phim không được quá 50 ký tự')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Tên phim không được chứa ký tự đặc biệt'),
  duration: yup.number()
    .required('Thời lượng là bắt buộc')
    .positive('Thời lượng phải là số nguyên dương')
    .integer('Thời lượng phải là số nguyên'),
  releaseDate: yup.date()
    .required('Ngày công chiếu là bắt buộc')
    .min(new Date(), 'Ngày công chiếu không được nhỏ hơn ngày hiện tại'),
  image: yup.mixed()
    .required('Ảnh phim là bắt buộc')
    .test('fileType', 'Chỉ chấp nhận file ảnh (.jpg, .png, .jpeg)', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
    }),
  status: yup.string().required('Trạng thái của phim là bắt buộc'),
  url: yup.string().url('Đường dẫn phải là URL hợp lệ').nullable(),
  summary: yup.string()
    .required('Tóm tắt là bắt buộc')
    .max(300, 'Tóm tắt không được quá 300 ký tự'),
  age: yup.number()
    .required('Độ tuổi là bắt buộc')
    .positive('Độ tuổi phải là số nguyên dương')
    .integer('Độ tuổi phải là số nguyên'),
});

const FormFilm = ({ parentCallback, listNameUsed }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const mutation = useAddFilm();

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        parentCallback(false);
      }
    });
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
                  options={listNameUsed.categories}
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
              innerRef={register}
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
              innerRef={register}
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
              innerRef={register}
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
              innerRef={register}
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
              innerRef={register}
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
              innerRef={register}
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

export default FormFilm;