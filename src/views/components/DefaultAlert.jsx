
import React from 'react'
import { Alert } from 'reactstrap'

const DefaultAlert = () => {
    return (
        <React.Fragment>
            <Alert color='primary'>
                <div className='fs-4'>
                    <span className='fw-bold'>Hello! </span>
                    <span> This feature is under development! .</span>
                </div>
            </Alert>
        </React.Fragment>
    )
}
export default DefaultAlert
