
const CustomTableHeader = ({ columnHeaders }) => {
  return (
    <thead className="border-top header_table">
      <tr>
        {columnHeaders?.map((header, index) => (
          <th key={index} className={index === columnHeaders?.length - 1 ? 'text-center' : ''}>{header}</th>
        ))}
      </tr>
    </thead>
  )
}
export default CustomTableHeader