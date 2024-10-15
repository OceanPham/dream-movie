  import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Input, Label, Row, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddFoodCategory } from './hook';
import useRole from '../../../../Auth/useRole';

// Định nghĩa schema với Yup
const schema = Yup.object().shape({
  name: Yup.string()
    .required('Tên loại thực phẩm không được để trống.')
    .min(3, 'Tên loại thực phẩm phải có ít nhất 3 ký tự.')
    .max(50, 'Tên loại thực phẩm không được dài quá 50 ký tự.')
    .matches(/^[^\d]/, 'Tên loại thực phẩm không được bắt đầu bằng số.')
    .matches(/^[A-Za-zÀ-ỹà-ỹ0-9\s]+$/, 'Tên loại thực phẩm không được phép chứa kí tự đặc biệt.'),
  description: Yup.string()
    .required('Mô tả loại thực phẩm không được để trống.')
    .max(300, 'Mô tả loại thực phẩm không được vượt quá 300 ký tự.'),
  max_stock_quatity: Yup.number()
    .required('Số lượng tồn kho tối đa không được để trống')
    .min(1, 'Số lượng phải lớn hơn 0.')
    .typeError('Số lượng phải là số nguyên, vui lòng nhập lại!')
    .integer('Số lượng phải là số nguyên, vui lòng nhập lại!'),
});

const FormFoodCategory = ({ parentCallback, listNameUsed }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { status: sttEdit, mutate: addFoodCategory } = useAddFoodCategory();
  const role = useRole();

  const [invalidName, setInvalidName] = useState('');
  const MAX_LENGTH = 300;
  const description = watch('description');
  const [wordCountDescription, setWordCountDescription] = useState(0);
  const [wordOverDescription, setWordOverDescription] = useState(false);

  useEffect(() => {
    setWordCountDescription(description ? description.length : 0);
    if (description ? (description.length <= MAX_LENGTH) : 0) setWordOverDescription(true);
    if (description ? (description.length > MAX_LENGTH) : 0) setWordOverDescription(false);
  }, [description]);

  const onSubmit = (data) => {
    if (role !== 'admin') {
      toast.error('Bạn không được phân quyền thêm loại thực phẩm!');
      return;
    }
    const db_submit = {
      name: data?.name?.trim() || '',
      description: data?.description?.trim() || '',
      max_stock_quatity: data?.max_stock_quatity || 0,
    };
    const errName = listNameUsed?.listNameUsed?.includes(db_submit.name.toLowerCase());
    if (errName) {
      setInvalidName('Tên loại thực phẩm đã tồn tại, vui lòng chọn tên khác.');
      return;
    }
    setInvalidName('');

    addFoodCategory(db_submit, {
      onSuccess: () => {
        toast.success('Thêm loại thực phẩm thành công!');
        setTimeout(() => {
          navigate("/manager/foodCategory");
          parentCallback();
          queryClient.invalidateQueries('foodCategories');
        }, 3000);
      },
      onError: () => toast.error('Thêm loại thực phẩm không thành công!'),
    });
  };

  return (
    <Card>
      <CardBody>
        <form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Tên loại thực phẩm <span>*</span>
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập vào tên loại thực phẩm" />}
              />
              {errors.name && <span className='errors'>{errors.name.message}</span>}
              {invalidName && <span className='errors'>{invalidName}</span>}
            </Col>

            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Mô tả loại thực phẩm <span>*</span>
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    type='textarea'
                    name='text'
                    id='exampleText'
                    rows='3'
                    placeholder='Nhập mô tả về loại thực phẩm'
                    {...field}
                  />
                )}
              />
              {errors.description && <span className='errors'>{errors.description.message}</span>}
              <span className={`float-end ${wordOverDescription ? 'text-success' : 'text-danger fw-bold'}`} style={{ fontSize: '13px' }}> {MAX_LENGTH}/{wordCountDescription}</span>
            </Col>

            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Số lượng tồn kho tối đa <span>*</span>
              </Label>
              <Controller
                name="max_stock_quatity"
                control={control}
                render={({ field }) => <Input type='number' {...field} placeholder="Nhập vào số lượng tồn kho tối đa" />}
              />
              {errors.max_stock_quatity && <span className='errors'>{errors.max_stock_quatity.message}</span>}
            </Col>

            <Col className='mt-50'>
              {sttEdit === "loading" ? (
                <Button color='primary' className='me-1' disabled>
                  <span className='loading-spinner'><Spinner /></span>
                  Loading...
                </Button>
              ) : (
                <Button color='primary' className='me-1'>Lưu</Button>
              )}
              <Button color='secondary' outline onClick={(e) => {
                navigate("/manager/foodCategory");
                parentCallback(false);
                e.preventDefault();
              }}>
                Hủy
              </Button>
            </Col>
          </Row>
        </form>
      </CardBody>
    </Card>
  );
};

export default FormFoodCategory;