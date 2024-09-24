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
import Select from 'react-select';
import countryList from 'react-select-country-list'; // Import the country list


const schema = Yup.object().shape({
  name: Yup.string()
    .required('Tên loại ghế không được để trống.')
    .min(3, 'Tên loại ghế phải có ít nhất 3 ký tự.')
    .max(50, 'Tên loại ghế không được dài quá 50 ký tự.')
    .matches(/^[^\d]/, 'Tên loại ghế không được bắt đầu bằng số.')
    .matches(/^[A-Za-zÀ-ỹà-ỹ0-9\s]+$/, 'Tên loại ghế không được phép chứa kí tự đặc biệt.')
  ,

  description: Yup.string()
    .max(300, 'Mô tả loại ghế không được vượt quá 300 ký tự.'),

  status: Yup.object()
    .required('Vui lòng chọn Trạng thái của nhà cung cấp.'),

  country: Yup.object()
    .required('Vui lòng chọn quốc gia của nhà cung cấp.'),

});
const FormShowtime = ({ parentCallback, listNameUsed }) => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema), })
  const { status: sttEdit, mutate: addChairCategory } = useAddChairCategory()
  const role = useRole()

  const options = countryList().getData(); // Get the list of countries
  const [country, setCountry] = useState(null);
  const [invalidName, setInvalidName] = useState('')
  const MAX_LENGTH = 300
  const description = watch('description')
  const [wordCountDescription, setWordCountDescription] = useState(0);
  const [wordOverDescription, setWordOverDescription] = useState(false);

  const optionStatus = {
    active: { value: 'active', label: 'Hoạt động' },
    inactive: { value: 'inactive', label: 'Tạm ngừng' },
    stop: { value: 'stop', label: 'Ngừng hợp tác' }
  };


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
      return;
    }
    setInvalidName('')

    addChairCategory(db_submit, {
      onSuccess: () => {
        toast.success('Thêm loại ghế thành công!')
        setTimeout(() => {
          navigate("/manager/showtime")
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

            {/* name */}
            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Phim chiếu <span>*</span>
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input
                  {...field}
                  placeholder="Nhập vào tên nhà cung cấp"
                />}
              />
              {errors.name && (
                <span className='errors'>{errors.name.message}</span>
              )}
              {invalidName && <span className='errors'>{invalidName}</span>}
            </Col>

            {/* status */}
            <Col md='6' className='mb-2'>
              <Label className='form-label'>
                Thời gian bắt đầu <span>*</span>
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className="form-select"
                  >
                    <option value="">Chọn trạng thái</option>
                    {Object.values(optionStatus).map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.status && (
                <span className='errors'>{errors.status.message}</span>
              )}
            </Col>

            {/* status */}
            <Col md='6' className='mb-2'>
              <Label className='form-label'>
                Rạp chiếu <span>*</span>
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className="form-select"
                  >
                    <option value="">Chọn trạng thái</option>
                    {Object.values(optionStatus).map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.status && (
                <span className='errors'>{errors.status.message}</span>
              )}
            </Col>

            {/* status */}
            <Col md='6' className='mb-2'>
              <Label className='form-label'>
                Phòng chiếu <span>*</span>
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className="form-select"
                  >
                    <option value="">Chọn trạng thái</option>
                    {Object.values(optionStatus).map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.status && (
                <span className='errors'>{errors.status.message}</span>
              )}
            </Col>

            {/* status */}
            <Col md='6' className='mb-2'>
              <Label className='form-label'>
                Định dạng chiếu <span>*</span>
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className="form-select"
                  >
                    <option value="">Chọn trạng thái</option>
                    {Object.values(optionStatus).map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.status && (
                <span className='errors'>{errors.status.message}</span>
              )}
            </Col>

            {/* country */}
            <Col md='6' className='mb-2'>
              <Label className='form-label'>
                Ngôn ngữ phim <span>*</span>
              </Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) =>
                  <Select
                    {...field}
                    options={options}
                    value={options.find(option => option.value === field.value)}
                    onChange={(selectedOption) => field.onChange(selectedOption.value)}
                    placeholder="Chọn quốc gia"
                    classNamePrefix="select"
                  />
                }
              />
              {errors.country && (
                <span className='errors'>{errors.country.message}</span>
              )}
            </Col>

            {/* email */}
            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Loại suất chiếu <span>*</span>
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input
                  {...field}
                  placeholder="Nhập vào tên địa chỉ email"
                />}
              />
              {errors.email && (
                <span className='errors'>{errors.email.message}</span>
              )}
              {invalidName && <span className='errors'>{invalidName}</span>}
            </Col>

            {/* phone */}
            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Trạng thái lịch chiếu <span>*</span>
              </Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input
                  {...field}
                  type='number'
                  placeholder="Nhập vào tên số điện thoại liên hệ"
                />}
              />
              {errors.phone && (
                <span className='errors'>{errors.phone.message}</span>
              )}
              {invalidName && <span className='errors'>{invalidName}</span>}
            </Col>

            {/* address */}
            <Col md='12' className='mb-2'>
              <Label className='form-label'>
                Chương trình khuyến mãi <span>*</span>
              </Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => <Input
                  {...field}
                  placeholder="Nhập vào tên địa chỉ liên hệ"
                />}
              />
              {errors.address && (
                <span className='errors'>{errors.address.message}</span>
              )}
              {invalidName && <span className='errors'>{invalidName}</span>}
            </Col>

            {/* description */}
            <Col sm='12' className='mb-2'>
              <Label className='form-label'>Mô tả về nhà cung cấp</Label>
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
                    placeholder='Nhập mô tả về nhà cung cấp'
                    {...field}
                  />
                )}
              />
              {errors.description && (
                <span className='errors'>{errors.description.message}</span>
              )}
            </Col>


            {/* action button */}
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
                navigate("/manager/showtime")
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


export default FormShowtime