import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Col, Input, Label, Row, Spinner } from 'reactstrap'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddChairCategory } from './hook'
import useRole from '../../../../Auth/useRole'

// Định nghĩa schema với Yup
const schema = Yup.object().shape({
  //Tên loại ghế
  chairCategory: Yup.string()
    .required('Tên loại ghế không được để trống.')
    .min(3, 'Tên loại ghế phải có ít nhất 3 ký tự.')
    .max(50, 'Tên loại ghế không được dài quá 50 ký tự.')
    .matches(/^[^\d]/, 'Tên loại ghế không được bắt đầu bằng số.')
    .matches(/^[A-Za-zÀ-ỹà-ỹ0-9\s]+$/, 'Tên loại ghế không được phép chứa kí tự đặc biệt.')
  ,

  // Mô tả loại ghế (Không bắt buộc, tối đa 300 ký tự)
  description: Yup.string()
    .max(300, 'Mô tả loại ghế không được vượt quá 300 ký tự.'),

  // Giá vé (Bắt buộc, kiểu số nguyên, lớn hơn 0)
  ticketPrice: Yup.number()
    .required('Vui lòng nhập giá vé.')
    .min(1, 'Giá vé phải lớn hơn 0.')
    .typeError('Giá vé phải là số nguyên, vui lòng nhập lại!')
    .integer('Giá vé phải là số nguyên, vui lòng nhập lại!'),

  // Số lượng tối đa mỗi phòng (Bắt buộc, kiểu số nguyên, lớn hơn 0)
  maxSeats: Yup.number()
    .required('Vui lòng nhập số lượng ghế tối đa mỗi phòng.')
    .min(1, 'Số lượng ghế tối đa phải lớn hơn 0.')
    .integer('Số lượng tối đa phải là số nguyên, vui lòng nhập lại!')
    .typeError('Số lượng tối đa phải là số nguyên, vui lòng nhập lại!')
    .max(200, 'Số lượng ghế thuộc loại này tối đa mỗi phòng là 200.')
});
const FormEmployee = ({ parentCallback, listNameUsed }) => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema), })
  const { status: sttEdit, mutate: addChairCategory } = useAddChairCategory()
  const role = useRole()

  const [invalidName, setInvalidName] = useState('')
  const MAX_LENGTH = 300
  const description = watch('description')
  const [wordCountDescription, setWordCountDescription] = useState(0);
  const [wordOverDescription, setWordOverDescription] = useState(false);


  useEffect(() => {
    setWordCountDescription(description ? description.length : 0)
    if (description ? (description.length <= MAX_LENGTH) : 0) setWordOverDescription(true)
    if (description ? (description.length > MAX_LENGTH) : 0) setWordOverDescription(false)

  }, [description])

  const onSubmit = (data) => {

    if (role !== 'admin') {
      toast.error('Bạn không được phân quyền thêm loại ghế!')
      return
    }
    const db_submit = {
      name: data?.chairCategory?.trim() || '',
      price: data?.ticketPrice || '',
      seatCount: data?.maxSeats || '',
      description: data?.description?.trim() || '',
    }
    const errName = listNameUsed?.listNameUsed?.includes(db_submit.name.toLowerCase());
    if (errName) {
      setInvalidName('Tên loại ghế đã tồn tại, vui lòng chọn tên khác.')
      return false;
    }
    setInvalidName('')

    addChairCategory(db_submit, {
      onSuccess: () => {
        toast.success('Thêm loại ghế thành công!')
        setTimeout(() => {
          navigate("/manager/chairCategory")
          parentCallback()
          queryClient.invalidateQueries('chairCategories'); // Invalidate the chair category query to refetch the updated data
        }, 3000);
      },
      onError: () => toast.error('Thêm loại ghế không thành công!'),
    })
  }


  return (
    <Card>
      <CardBody>
        <form
          className='mt-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row>

            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Tên loại ghế <span>*</span>
              </Label>
              <Controller
                name="chairCategory"
                control={control}
                render={({ field }) => <Input
                  {...field}
                  placeholder="Nhập vào tên loại ghế"
                />}
              />
              {errors.chairCategory && (
                <span className='errors'>{errors.chairCategory.message}</span>
              )}
              {invalidName && <span className='errors'>{invalidName}</span>}
            </Col>

            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Giá vé loại ghế (.VND) <span>*</span>
              </Label>
              <Controller
                name="ticketPrice"
                control={control}
                render={({ field }) => <Input
                  {...field}
                  type='number'
                  placeholder="Nhập vào giá vé của loại ghế"
                />}
              />
              {errors.ticketPrice && (
                <span className='errors'>{errors.ticketPrice.message}</span>
              )}
            </Col>

            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Số ghế tối đa có trong một phòng <span>*</span>
              </Label>
              <Controller
                name="maxSeats"
                control={control}
                render={({ field }) => <Input
                  {...field}
                  type='number'
                  placeholder="Nhập vào số ghế tối đa có trong một phòng"
                />}
              />
              {errors.maxSeats && (
                <span className='errors'>{errors.maxSeats.message}</span>
              )}
            </Col>

            <Col sm='12' className='mb-2'>
              <Label className='form-label'>Mô tả về loại ghế</Label>
              <span className={`float-end ${wordOverDescription ? 'text-success' : 'text-danger fw-bold'}`} style={{ fontSize: '13px' }}> {MAX_LENGTH}/{wordCountDescription}</span>

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    type='textarea'
                    name='text'
                    id='exampleText'
                    rows='3'
                    placeholder='Nhập mô tả về loại ghế'
                    {...field}
                  />
                )}
              />
              {errors.description && (
                <span className='errors'>{errors.description.message}</span>
              )}
            </Col>

            <Col className='mt-50'>
              {(sttEdit === "loading") ? (
                <Button
                  color='primary'
                  className='me-1'
                  disabled
                >
                  <span className='loading-spinner'><Spinner /></span>
                  Loading...
                </Button>

              ) : (

                <Button
                  color='primary'
                  className='me-1'
                >
                  Lưu
                </Button>

              )}

              <Button color='secondary' outline onClick={(e) => {
                navigate("/manager/chairCategory")
                parentCallback(false)
                e.preventDefault()
              }}>
                Hủy
              </Button>
            </Col>
          </Row>
        </form>

      </CardBody>
    </Card>
  )
}


export default FormEmployee