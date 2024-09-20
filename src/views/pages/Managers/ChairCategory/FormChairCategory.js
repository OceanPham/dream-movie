import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'react-feather'
import { Controller, useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button, Card, CardBody, Col, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Spinner } from 'reactstrap'
import { submitForm } from './submitForm'
// import SaveButtonGroup from '../../form-button/SaveButtonGroup'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// Định nghĩa schema với Yup
const schema = Yup.object().shape({
  //Tên loại ghế
  chairCategory: Yup.string()
    .required('Tên loại ghế không được để trống.')
    .min(3, 'Tên loại ghế phải có ít nhất 3 ký tự.')
    .max(50, 'Tên loại ghế không được dài quá 50 ký tự.')
    .matches(/^[^\d]/, 'Tên loại ghế không được bắt đầu bằng số.')
    .matches(/^[A-Za-zÀ-ỹà-ỹ0-9\s]+$/, 'Tên loại ghế không được phép chứa kí tự đặc biệt.')
    .test('unique-name', 'Tên loại ghế đã tồn tại, vui lòng chọn tên khác.', function (value) {
      const existingNames = ['Ghế Văn Phòng', 'Ghế Sofa']; // Danh sách tên đã tồn tại
      return !existingNames.includes(value);
    })
  ,

  // Mô tả loại ghế (Không bắt buộc, tối đa 300 ký tự)
  description: Yup.string()
    .max(300, 'Mô tả loại ghế không được vượt quá 300 ký tự.'),

  // Giá vé (Bắt buộc, kiểu số nguyên, lớn hơn 0)
  ticketPrice: Yup.number()
    .required('Vui lòng nhập giá vé')
    .min(1, 'Giá vé phải lớn hơn 0.')
    .typeError('Giá vé phải là số nguyên, vui lòng nhập lại!')
    .integer('Giá vé phải là số nguyên, vui lòng nhập lại!'),

  // Số lượng tối đa mỗi phòng (Bắt buộc, kiểu số nguyên, lớn hơn 0)
  maxSeats: Yup.number()
    .required('Vui lòng nhập số lượng ghế tối đa mỗi phòng.')
    .min(1, 'Số lượng ghế tối đa phải lớn hơn 0.')
    .typeError('Số lượng tối đa phải là số nguyên.')
    .integer('Số lượng tối đa phải là số nguyên.')
});
const FormChairCategory = ({ parentCallback, edit }) => {


  const { control, handleSubmit, watch, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema), })

  const onSubmit = (data) => {
    alert('Data submitted: ' + JSON.stringify(data, null, 2));
    console.log('data:', data);

    // const submitFormCallback = (featureResponse, screenshotResponse, editedFiles) => {
    //   submitForm(
    //     data, dataAttributes, parentCallback, queryClient, editProject, featureResponse, history, screenshotResponse, editedFiles, oldData, shouldRenderFeatureImg
    //   )
    // }

    // const handleFeatureError = (error) => {
    //   toast.error("Feature Image addition unsuccessful!")
    //   throw new Error(error)
    // }

    // const handleMediaError = (error) => {
    //   toast.error("Upload Portfolio files addition unsuccessful!")
    //   throw new Error(error)
    // }

    // const newFiles = screenshot.filter(file => !file.id) || []
    // const editedFiles = screenshot.filter(file => file.id) || []
    // const handleNoChanges = () => submitFormCallback("", "", "")
    // const updateFeatureAndUpdateScreenshot = (fileImg, newFiles) => {
    //   updateFeature(fileImg, {
    //     onSuccess: (featureResponse) => {
    //       updateScreenshot(newFiles, {
    //         onSuccess: (screenshotResponse) => {
    //           submitFormCallback(featureResponse, screenshotResponse, editedFiles)
    //         },
    //         onError: (error) => handleMediaError(error)
    //       })
    //     },
    //     onError: (error) => handleFeatureError(error)
    //   })
    // }

    // if (fileImg && newFiles.length > 0) {
    //   updateFeatureAndUpdateScreenshot(fileImg, newFiles)
    // } else if (!fileImg && newFiles.length > 0) {
    //   updateScreenshot(newFiles, {
    //     onSuccess: (screenshotResponse) => {
    //       submitFormCallback("", screenshotResponse, editedFiles)
    //     },
    //     onError: (error) => handleMediaError(error)
    //   })
    // } else if (fileImg) {
    //   const filesToUpdate = editedFiles.length > 0 ? editedFiles : ""
    //   updateFeature(fileImg, {
    //     onSuccess: (featureResponse) => {
    //       submitFormCallback(featureResponse, filesToUpdate, editedFiles)
    //     },
    //     onError: (error) => handleFeatureError(error)
    //   })
    // } else if (editedFiles.length > 0) {
    //   submitFormCallback("", "", editedFiles)
    // } else {
    //   handleNoChanges()
    // }
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
              {('sttSave' === "loading") ? (
                <Button
                  color='primary'
                  className='me-1'
                  disabled
                >
                  <span className='loading-spinner'><Spinner /></span>
                  On Saving...
                </Button>

              ) : (

                <Button
                  color='primary'
                  className='me-1'
                >
                  Save
                </Button>

              )}

              {/* <Button color='secondary' outline onClick={(e) => {
                handleAction(action)
                parentCallback(false)
                e.preventDefault()
              }}>
                Cancel
              </Button> */}
            </Col>
          </Row>
        </form>

      </CardBody>
    </Card>
  )
}


export default FormChairCategory