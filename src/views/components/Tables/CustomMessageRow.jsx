import React from 'react'

const CustomMessageRow = ({ colSpan, message }) => {
  return (
    <tr>
      <td colSpan={colSpan}>{message}</td>
    </tr>
  )
}
export default CustomMessageRow