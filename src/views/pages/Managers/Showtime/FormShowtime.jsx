import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Col, Input, Label, Row, Spinner } from 'reactstrap'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddChairCategory, useGetALLCinema, useGetALLRoom } from './hook'
import useRole from '../../../../Auth/useRole'
import { DatePicker } from 'antd'


const schema = Yup.object().shape({
  name: Yup.string()
    .required('Vui lòng chọn một bộ phim.'),
  cinema: Yup.string()
    .required('Vui lòng chọn rạp chiếu.'),
  room: Yup.string()
    .required('Vui lòng chọn phòng chiếu.'),
  format: Yup.string()
    .required('Vui lòng chọn định dạng chiếu.'),
  language: Yup.string()
    .required('Vui lòng chọn ngôn ngữ cho phim.'),
  status: Yup.string()
    .required('Vui lòng chọn trạng thái cho lịch chiếu.'),
  type: Yup.string()
    .required('Vui lòng chọn loại suất chiếu.'),
  statusShowTime: Yup.string()
    .required('Vui lòng chọn trạng thái cho lịch chiếu.'),

  time_start: Yup.string()
    .required('Vui lòng chọn thời gian bắt đầu chiếu.')
    .test('max-1-month', 'Thời gian lịch chiếu xa hơn thời gian hiện tại không quá 1 tháng!', function (value) {
      if (!value) return false;
      const selectedDate = new Date(value)
      const currentDate = new Date()
      const maxAllowedDate = new Date()
      const currentMonth = currentDate.getMonth()
      maxAllowedDate.setMonth(currentMonth + 1)
      return selectedDate <= maxAllowedDate;
    }),
});
const FormShowtime = ({ parentCallback, listNameUsed }) => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema), })
  const { status: sttEdit, mutate: addChairCategory } = useAddChairCategory()
  const role = useRole()

  const { status, data: dataListCinema } = useGetALLCinema()
  const { statusRoom, data: dataListRoom } = useGetALLRoom()

  const listCinema = dataListCinema && dataListCinema?.length > 0 && dataListCinema?.map((item, index) => {
    return {
      id: item.id,
      name: item?.name
    }
  })

  const listRoom = dataListRoom && dataListRoom?.length > 0 && dataListRoom?.map((item, index) => {
    return {
      id: item.id,
      name: item?.name
    }
  })

  const optionStatus = {
    active: { value: 'active', label: 'Hoạt động' },
    inactive: { value: 'inactive', label: 'Tạm ngừng' },
    stop: { value: 'stop', label: 'Ngừng hợp tác' }
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };

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
            <Col md='6' className='mb-3'>
              <Label className='form-label'>
                Phim chiếu <span>*</span>
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className={`form-select ${!field.value ? 'none_Selected' : ''}`}
                  >
                    <option value="">Chọn phim chiếu</option>
                    {Object.values(optionStatus).map((cinema) => (
                      <option key={cinema.value} value={cinema.value}>
                        {cinema.label}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.name && (
                <span className='errors'>{errors.name.message}</span>
              )}
            </Col>

            {/* time_start */}
            <Col md='6' className='mb-3'>
              <Label className='form-label'>
                Thời gian bắt đầu <span>*</span>
              </Label>
              <Controller
                name="time_start"
                control={control}
                render={({ field }) =>
                  <DatePicker
                    {...field}
                    showTime
                    className='w-100'
                    style={{ height: '55%' }}
                    onChange={(value, dateString) => {
                      field.onChange(value);
                      console.log('Selected Time: ', value);
                      console.log('Formatted Selected Time: ', dateString);
                    }}
                    onOk={onOk}
                  />
                }
              />
              {errors.time_start && (
                <span className='errors'>{errors.time_start.message}</span>
              )}
            </Col>

            {/* cinema */}
            <Col md='6' className='mb-3'>
              <Label className='form-label'>
                Rạp chiếu <span>*</span>
              </Label>
              <Controller
                name="cinema"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className={`form-select ${!field.value ? 'none_Selected' : ''}`}
                  >
                    <option value="">Chọn rạp chiếu</option>
                    {Object.values(listCinema).map((cinema) => (
                      <option key={cinema.id} value={cinema.id}>
                        {cinema.name}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.cinema && (
                <span className='errors'>{errors.cinema.message}</span>
              )}
            </Col>

            {/* room */}
            <Col md='6' className='mb-3'>
              <Label className='form-label'>
                Phòng chiếu <span>*</span>
              </Label>
              <Controller
                name="room"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className={`form-select ${!field.value ? 'none_Selected' : ''}`}
                  >
                    <option value="">Chọn phòng chiếu</option>
                    {Object.values(listRoom).map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.room && (
                <span className='errors'>{errors.room.message}</span>
              )}
            </Col>

            {/* format */}
            <Col md='6' className='mb-3'>
              <Label className='form-label'>
                Định dạng chiếu <span>*</span>
              </Label>
              <Controller
                name="format"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className={`form-select ${!field.value ? 'none_Selected' : ''}`}
                  >
                    <option value="">Chọn định dạng chiếu</option>
                    {Object.values(optionStatus).map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.format && (
                <span className='errors'>{errors.format.message}</span>
              )}
            </Col>

            {/* language */}
            <Col md='6' className='mb-3'>
              <Label className='form-label'>
                Ngôn ngữ của phim <span>*</span>
              </Label>
              <Controller
                name="language"
                control={control}
                render={({ field }) =>
                  <Input
                    {...field}
                    className={`form-select ${!field.value ? 'none_Selected' : ''}`}
                    type="select"
                  >
                    <option value="">Chọn ngôn ngữ của phim</option>
                    {Object.values(optionStatus).map((language) => (
                      <option key={language.value} value={language.value}>
                        {language.label}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.language && (
                <span className='errors'>{errors.language.message}</span>
              )}
            </Col>

            {/* type */}
            <Col md='6' className='mb-3'>
              <Label className='form-label'>
                Loại suất chiếu <span>*</span>
              </Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className={`form-select ${!field.value ? 'none_Selected' : ''}`}
                  >
                    <option value="">Chọn loại suất chiếu</option>
                    {Object.values(optionStatus).map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.type && (
                <span className='errors'>{errors.type.message}</span>
              )}
            </Col>

            {/* statusShowTime */}
            <Col md='6' className='mb-3'>
              <Label className='form-label'>
                Trạng thái của lịch chiếu <span>*</span>
              </Label>
              <Controller
                name="statusShowTime"
                control={control}
                defaultValue={Object.values(optionStatus)[0].value}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className={`form-select ${!field.value ? 'none_Selected' : ''}`}
                  >
                    {Object.values(optionStatus).map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.statusShowTime && (
                <span className='errors'>{errors.statusShowTime.message}</span>
              )}
            </Col>

            {/* voucher */}
            <Col md='12' className='mb-5'>
              <Label className='form-label'>
                Chương trình khuyến mãi
              </Label>
              <Controller
                name="voucher"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className={`form-select ${!field.value ? 'none_Selected' : ''}`}
                  >
                    <option value="">Chọn chương trình khuyến mãi</option>
                    {/* {Object.values(optionvoucher).map((voucher) => (
                      <option key={voucher.value} value={voucher.value}>
                        {voucher.label}
                      </option>
                    ))} */}
                  </Input>
                }
              />
              {errors.voucher && (
                <span className='errors'>{errors.voucher.message}</span>
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