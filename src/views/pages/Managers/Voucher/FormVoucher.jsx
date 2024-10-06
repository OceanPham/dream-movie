import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Col, Input, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from 'antd';
import moment from 'moment';

// Định nghĩa schema với Yup để kiểm tra các trường dữ liệu
const schema = Yup.object().shape({
  employeeName: Yup.string()
    .required('Tên đăng nhập nhân viên không được để trống.') //1
    .matches(/^[^\d][A-Za-z0-9]*$/, 'Tên đăng nhập nhân viên phải bắt đầu bằng chữ và bao gồm chữ và số.') //2
    .max(50, 'Tên đăng nhập nhân viên không được dài quá 50 ký tự.') //3
    .min(8, 'Tên đăng nhập nhân viên không được ít hơn 8 ký tự.'), //4

  voucherCode: Yup.string()
    .required('Vui lòng nhập tên của mã giảm giá.') //1 
    .min(5, 'Vui lòng nhập tên mã giảm giá từ 5-14 kí tự.') //2
    .max(14, 'Vui lòng nhập tên mã giảm giá từ 5-14 kí tự.') //3
    .matches(/^[A-Za-z0-9]*$/, 'Mã giảm giá chỉ được chứa chữ và số, không có ký tự đặc biệt.'), // 4
  
  discountRate: Yup.number()
    .required('Vui lòng nhập tỉ lệ chiết khấu.') //1
    .min(5, 'Tỉ lệ chiết khấu phải trong khoảng từ 5-50%.') //2
    .max(50, 'Tỉ lệ chiết khấu phải trong khoảng từ 5-50%.') //3
    .typeError('Tỉ lệ chiết khấu phải là một số hợp lệ.'), //4

  usageLimit: Yup.number()
    .required('Vui lòng nhập hạn mức.') //1
    .min(5000000, 'Hạn mức phải từ 5,000,000 đến 15,000,000 VNĐ.') //2
    .max(15000000, 'Hạn mức phải từ 5,000,000 đến 15,000,000 VNĐ.') //3
    .typeError('Hạn mức phải là một số hợp lệ.'), //4

  status: Yup.string()
    .required('Vui lòng chọn tình trạng mã giảm giá.'), //1

  createdAt: Yup.date()
    .required('Vui lòng chọn ngày tạo.') //1
    .min(moment().startOf('day'), 'Hãy chọn ngày tạo hợp lệ.'), //2

  expiryDate: Yup.date()
    .required('Vui lòng chọn hạn dùng.') //1
    .test('is-after-createdAt', 'Hạn dùng phải sau ngày tạo ít nhất 1 giờ.', function (value) { //2
      const createdAt = this.resolve(Yup.ref('createdAt'));
      return moment(value).isAfter(moment(createdAt).add(1, 'hour'));
    }),
});

const FormVoucher = ({ parentCallback }) => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      createdAt: null,
      expiryDate: null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const db_submit = {
      employeeName: data?.employeeName?.trim() || '',
      voucherCode: data?.voucherCode?.trim() || '',
      discountRate: data?.discountRate || '',
      usageLimit: data?.usageLimit || '',
      status: data?.status || '',
      createdAt: data.createdAt,
      expiryDate: data.expiryDate,
    };

    toast.success('Form submitted successfully');
    console.log('Data submitted: ', db_submit);
  };

  return (
    <Card>
      <CardBody className='Sideform'>
        <form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* Tên đăng nhập nhân viên */}
            <Col md='12' className='mb-4'>
              <Label className='form-label'>
                Tên đăng nhập nhân viên <span>*</span>
              </Label>
              <Controller
                name="employeeName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Nhập vào tên đăng nhập nhân viên" />
                )}
              />
              {errors.employeeName && <span className='errors'>{errors.employeeName.message}</span>}
            </Col>

            {/* Mã giảm giá */}
            <Col md='12' className='mb-4'>
              <Label className='form-label'>
                Mã giảm giá <span>*</span>
              </Label>
              <Controller
                name="voucherCode"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Nhập vào mã giảm giá" />
                )}
              />
              {errors.voucherCode && <span className='errors'>{errors.voucherCode.message}</span>}
            </Col>

            {/* Tỉ lệ chiết khấu */}
            <Col md='12' className='mb-4'>
              <Label className='form-label'>
                Tỉ lệ chiết khấu (%) <span>*</span>
              </Label>
              <Controller
                name="discountRate"
                control={control}
                render={({ field }) => (
                  <Input {...field} type='number' placeholder="Nhập vào tỉ lệ chiết khấu" />
                )}
              />
              {errors.discountRate && <span className='errors'>{errors.discountRate.message}</span>}
            </Col>

            {/* Hạn mức */}
            <Col md='12' className='mb-4'>
              <Label className='form-label'>
                Hạn mức (VNĐ)<span>*</span>
              </Label>
              <Controller
                name="usageLimit"
                control={control}
                render={({ field }) => (
                  <Input {...field} type='number' placeholder="Nhập vào hạn mức" />
                )}
              />
              {errors.usageLimit && <span className='errors'>{errors.usageLimit.message}</span>}
            </Col>

            {/* Tình trạng mã giảm giá */}
            <Col md='12' className='mb-4'>
              <Label className='form-label'>
                Tình Trạng <span>*</span>
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Input type="select" {...field} className="form-select">
                    <option value="">Chọn trạng thái</option>
                    <option value="active">Đang diễn ra</option>
                    <option value="stop">Đã hết hạn</option>
                  </Input>
                )}
              />
              {errors.status && <span className='errors'>{errors.status.message}</span>}
            </Col>

            {/* Ngày tạo */}
            <Col md='6' className='mb-4'>
              <Label className='form-label'>Ngày tạo <span>*</span></Label>
              <Controller
                name="createdAt"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    showTime
                    {...field}
                    onChange={(value) => setValue('createdAt', value)}
                  />
                )}
              />
              {errors.createdAt && <span className='errors'>{errors.createdAt.message}</span>}
            </Col>

            {/* Hạn dùng */}
            <Col md='6' className='mb-4'>
              <Label className='form-label'>Hạn dùng <span>*</span></Label>
              <Controller
                name="expiryDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    showTime
                    {...field}
                    onChange={(value) => setValue('expiryDate', value)}
                  />
                )}
              />
              {errors.expiryDate && <span className='errors'>{errors.expiryDate.message}</span>}
            </Col>

            {/* Buttons */}
            <Col className='mt-70'>
              <Button color='primary' className='me-2' type="submit">
                Thêm
              </Button>
              <Button color='secondary' outline onClick={() => parentCallback(false)}>
                Hủy
              </Button>
            </Col>
          </Row>
        </form>
      </CardBody>
    </Card>
  );
};

export default FormVoucher;
