import React from 'react';
import LoadingDot from '../Loading/LoadingDot';

const LoadingRow = ({ colSpan }) => (
  <tbody>
    <tr>
      <td colSpan={colSpan}>
        <div className='d-flex justify-content-center my-1'>
          <LoadingDot />
        </div>
      </td>
    </tr>
  </tbody>
)

export default LoadingRow