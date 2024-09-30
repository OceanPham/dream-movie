import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Col, Input, Label, Row, Spinner } from 'reactstrap'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddChairCategory, useAddShowTime, useGetALLCinema, useGetALLLanguage, useGetALLMovie, useGetALLRoom, useGetALLScreeningFormat, useGetALLScreeningType, useGetALLVoucher } from './hook'
import useRole from '../../../../Auth/useRole'
import { DatePicker } from 'antd'


const schema = Yup.object().shape({
  movie: Yup.string()
    .required('Vui lòng chọn một bộ phim.'),
  cinema: Yup.string()
    .required('Vui lòng chọn rạp chiếu.'),
  room: Yup.string()
    .required('Vui lòng chọn phòng chiếu.'),
  format: Yup.string()
    .required('Vui lòng chọn định dạng chiếu.'),
  language: Yup.string()
    .required('Vui lòng chọn ngôn ngữ cho phim.'),
  type: Yup.string()
    .required('Vui lòng chọn loại suất chiếu.'),
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
    })
    .test('before-current', 'Thời gian lịch chiếu phải sau thời gian hiện tại!', function (value) {
      if (!value) return false;
      const selectedDate = new Date(value)
      const currentDate = new Date()
      return selectedDate > currentDate;
    })
  ,
});
const FormShowtime = ({ parentCallback, listShowTime }) => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema), })
  const { status: sttEdit, mutate: addShowTime } = useAddShowTime();
  const role = useRole()

  const cinemaSelected = watch('cinema')

  const [listCinema, setListCinema] = useState();
  const [listRoom, setListRoom] = useState();
  const [listMovie, setListMovie] = useState();
  const [listScreeningFormat, setListScreeningFormat] = useState();
  const [listScreeningType, setListScreeningType] = useState();
  const [listLanguage, setListLanguage] = useState();
  const [listVoucher, setListVoucher] = useState();

  const { status, data: dataListCinema } = useGetALLCinema()
  const { statusRoom, data: dataListRoom } = useGetALLRoom()
  const { statusMovie, data: dataListMovie } = useGetALLMovie()
  const { statusScreeningFormat, data: dataListScreeningFormat } = useGetALLScreeningFormat()
  const { statusScreeningType, data: dataListScreeningType } = useGetALLScreeningType()
  const { statusLanguage, data: dataListLanguage } = useGetALLLanguage()
  const { statusVoucher, data: dataListVoucher } = useGetALLVoucher()

  const convertDurationToMs = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const totalMilliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
    return totalMilliseconds;
  }

  const checkValideShowTime = (start_Time, end_Time) => {
    const startTime = new Date(start_Time).getTime();
    console.log('startTime; ', startTime);

    const endTime = new Date(end_Time).getTime();
    console.log('endTime; ', endTime);

    console.log('listShowTime: ', listShowTime);

    for (const item of listShowTime?.listShowTime) {
      console.log('item: ', item);

      const startTimeExisting = new Date(item?.start_time).getTime();
      console.log('startTimeExisting; ', startTimeExisting);

      const durationItem = convertDurationToMs(item?.film?.thoiluong || "00:00:00")
      console.log('durationItem; ', durationItem);

      const endTimeExisting = startTimeExisting + durationItem
      console.log('endTimeExisting; ', endTimeExisting);


      if (startTime <= startTimeExisting && startTimeExisting <= endTime) return false
      if (startTime <= startTimeExisting && (startTimeExisting <= endTime || endTimeExisting <= endTime)) return false
      if (startTimeExisting <= startTime && (startTime <= endTimeExisting || endTime <= endTimeExisting)) return false
      if (startTimeExisting <= startTime && startTime <= endTimeExisting) return false
    }
    return true;

    // listShowTime && listShowTime?.listShowTime?.length > 0 && listShowTime?.listShowTime?.map((item) => {
    //   const startTimeExisting = new Date(item?.start_time).getTime();
    //   const durationItem = convertDurationToMs(item?.film?.thoiluong || "00:00:00")
    //   const endTimeExisting = new Date(startTimeExisting + durationItem)

    //   if (startTime <= startTimeExisting && startTimeExisting <= endTime) return false
    //   if (startTime <= startTimeExisting && (startTimeExisting <= endTime || endTimeExisting <= endTime)) return false
    //   if (startTimeExisting <= startTime && (startTime <= endTimeExisting || endTime <= endTimeExisting)) return false
    //   if (startTimeExisting <= startTime && startTime <= endTimeExisting) return false

    //   return true;
    // })

  }


  useEffect(() => {
    const fetchCinema = dataListCinema && dataListCinema?.length > 0 && dataListCinema?.map((item, index) => {
      return {
        id: item.id,
        name: item?.name
      }
    })

    const fetchRoom = cinemaSelected && dataListRoom && dataListRoom?.length > 0 && dataListRoom?.filter((item) => item?.cinema?.id === cinemaSelected)
      .map(item => ({
        id: item.id,
        name: item?.name
      }))

    const fetchMovie = dataListMovie && dataListMovie?.length > 0 && dataListMovie?.filter((item) => item?.trangthai == 1)
      .map((item) => {
        return {
          id: item.id,
          name: item?.name,
          thoiluong: item?.thoiluong
        }
      })

    const fetchScreeningFormat = dataListScreeningFormat && dataListScreeningFormat?.length > 0 && dataListScreeningFormat?.map((item, index) => {
      return {
        id: item.id,
        name: item?.name,
        status: item?.status
      }
    })

    const fetchScreeningType = dataListScreeningType && dataListScreeningType?.length > 0 && dataListScreeningType?.map((item, index) => {
      return {
        id: item.id,
        name: item?.name,
        status: item?.status
      }
    })

    const fetchLanguage = dataListLanguage && dataListLanguage?.length > 0 && dataListLanguage?.map((item, index) => {
      return {
        id: item.id,
        name: item?.name,
        status: item?.status
      }
    })

    const fetchVoucher = dataListVoucher && dataListVoucher?.length > 0 && dataListVoucher?.map((item, index) => {
      return {
        id: item.id,
        name: item?.name,
        tinh_trang: item?.tinh_trang,
        han_dung: item?.han_dung,
      }
    })

    setListCinema(fetchCinema)
    setListRoom(fetchRoom)
    setListMovie(fetchMovie)
    setListScreeningFormat(fetchScreeningFormat)
    setListLanguage(fetchLanguage)
    setListScreeningType(fetchScreeningType)
    setListVoucher(fetchVoucher)
  }, [status, statusRoom, statusMovie, statusScreeningFormat, statusLanguage, statusScreeningType, statusVoucher])


  useEffect(() => {
    const fetchRoom = cinemaSelected && dataListRoom && dataListRoom?.length > 0 && dataListRoom?.filter((item) => item?.cinema?.id == cinemaSelected)
      .map(item => ({
        id: item.id,
        name: item?.name
      }))

    setListRoom(fetchRoom)

  }, [cinemaSelected])

  const optionStatus = {
    active: { value: 'active', label: 'Hoạt động' },
    // showed: { value: 'showed', label: 'Đã chiếu' },
    inactive: { value: 'inactive', label: 'Tạm hoãn' },
    stop: { value: 'stop', label: 'Đã hủy' }
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  const onSubmit = (data) => {

    if (role !== 'admin') {
      toast.error('Bạn không được phân quyền thêm loại ghế!')
      return
    }
    // console.log('data: ', data);
    const convertMovie = JSON.parse(data?.movie);
    // console.log('convertMovie: ', convertMovie);

    const start_time = data?.time_start ? new Date(data.time_start)?.toISOString() : '';
    // console.log('start_time: ', start_time);
    const duration = convertMovie?.thoiluong || "00:00:00";
    // console.log('duration: ', duration);

    const durationInMs = convertDurationToMs(duration);

    const end_time = new Date(new Date(start_time).getTime() + durationInMs);
    // console.log('end_time: ', end_time.toISOString());

    const checkSchedule = checkValideShowTime(start_time, end_time)
    // console.log('checkSchedule: ', checkSchedule);

    if (!checkSchedule) {
      toast.error('Rạp đã có lịch chiếu vào thời gian này, vui lòng chọn thời gian khác.')
      return
    }

    const db_submit = {
      film: {
        id: parseInt(convertMovie?.id) || 0
      },
      start_time: data?.time_start ? new Date(data.time_start)?.toISOString() : '',
      cinema: {
        id: parseInt(data?.cinema) || 0
      },
      room: {
        id: parseInt(data?.room) || 0
      },
      screeningFormat: {
        id: parseInt(data?.format) || 0
      },
      language: {
        id: parseInt(data?.language) || 0
      },
      screeningType: {
        id: parseInt(data?.type) || 0
      },
      status: data?.statusShowTime == 'stop' ? 'Đã hủy' : data?.statusShowTime == 'inactive' ? 'Tạm hoãn' : 'Hoạt Động',
      voucher: {
        id: parseInt(data?.voucher) || 0
      }
    }


    addShowTime(db_submit, {
      onSuccess: () => {
        toast.success('Thêm lịch chiếu thành công!')
        setTimeout(() => {
          navigate("/manager/showtime")
          parentCallback()
          queryClient.invalidateQueries('showtime')
        }, 3000);
      },
      onError: () => toast.error('Thêm lịch chiếu không thành công!'),
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
                    {listCinema && listCinema?.length > 0 && Object?.values(listCinema)?.map((cinema) => (
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
                    {listRoom && listRoom?.length > 0 && Object.values(listRoom).map((room) => (
                      <option key={room?.id} value={room?.id}>
                        {room?.name}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.room && (
                <span className='errors'>{errors.room.message}</span>
              )}
            </Col>


            {/* movie */}
            <Col md='6' className='mb-3'>
              <Label className='form-label'>
                Phim chiếu <span>*</span>
              </Label>
              <Controller
                name="movie"
                control={control}
                render={({ field }) =>
                  <Input
                    type="select"
                    {...field}
                    className={`form-select ${!field.value ? 'none_Selected' : ''}`}
                  >
                    <option value="">Chọn phim chiếu</option>
                    {listMovie && listMovie?.length > 0 && Object?.values(listMovie)?.map((cinema) => (
                      <option key={cinema?.id} value={JSON.stringify(cinema)}>
                        {cinema?.name}
                      </option>
                    ))}
                  </Input>
                }
              />
              {errors.movie && (
                <span className='errors'>{errors.movie.message}</span>
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
                    style={{ maxHeight: '55%' }}
                    onChange={(value, dateString) => {
                      field.onChange(value);
                    }}
                    onOk={onOk}
                  />
                }
              />
              {errors.time_start && (
                <span className='errors'>{errors.time_start.message}</span>
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
                    {listScreeningFormat && listScreeningFormat?.length > 0 && Object?.values(listScreeningFormat)?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
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
                    {listLanguage && listLanguage?.length > 0 && Object?.values(listLanguage)?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
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
                    {listScreeningType && listScreeningType?.length > 0 && Object?.values(listScreeningType)?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
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
                render={({ field }) => (
                  <Input
                    type="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);  // Đảm bảo giá trị được cập nhật đúng cách
                    }}
                  >
                    {Object.values(optionStatus).map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Input>
                )}
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
                    {listVoucher && listVoucher?.length > 0 && Object?.values(listVoucher)?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
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