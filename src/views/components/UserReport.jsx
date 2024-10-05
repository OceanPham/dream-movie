// ** Third Party Components
import { Bar } from 'react-chartjs-2'

// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
// Import các thành phần cần thiết từ chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { timeReFormatDate } from '../../hooks/useFormattedDate'

// Đăng ký các thành phần
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserReport = ({ dataLasterUser }) => {
  const success = '#28dac6';
  const labelColor = '#6e6b7b';
  const gridLineColor = 'rgba(200, 200, 200, 0.2)';

  console.log('dataLasterUser: ', dataLasterUser);

  const datesArray = dataLasterUser && dataLasterUser.map(item => {
    const dateParts = timeReFormatDate(item.createdAt);
    const dateSplit = dateParts.split('-');
    const formattedDate = `${dateSplit[2]}/${dateSplit[1]}`;
    return formattedDate;
  });

  const groupedUsersByDate = datesArray.reduce((acc, date) => {
    if (acc[date]) {
      acc[date] += 1; // Nếu đã có ngày này thì tăng số lượng user
    } else {
      acc[date] = 1; // Nếu chưa có ngày này thì khởi tạo với 1 user
    }
    return acc;
  }, {});
  const labels = Object.keys(groupedUsersByDate); // Lấy các ngày (labels)
  const userArray = Object.values(groupedUsersByDate); // Lấy số lượng user tương ứng mỗi ngày

  // const userArray = dataLasterUser && dataLasterUser?.map((item) => item?.record_count);
  const maxValue = Math.max(...userArray);
  // const maxValue = 10;
  const roundUpToNearest = Math.ceil(maxValue / 10) * 10;

  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor
        },
        ticks: { color: labelColor }
      },
      y: {
        min: 0,
        max: roundUpToNearest,
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor
        },
        ticks: {
          stepSize: 2,
          color: labelColor
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }

  // ** Chart data
  const data = {
    labels: labels || [], // Nhãn là danh sách các ngày đã nhóm,
    datasets: [
      {
        maxBarThickness: 15,
        backgroundColor: success,
        borderColor: 'transparent',
        borderRadius: { topRight: 15, topLeft: 15 },
        data: userArray || []
      }
    ]
  }

  console.log('data: ', data);
  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <CardTitle tag='h4'>Latest Users</CardTitle>
        {/* <div className='d-flex align-items-center'>
          <Calendar size={14} />
          <Flatpickr
            className='form-control flat-picker bg-transparent border-0 shadow-none'
            options={{
              mode: 'range',
              // eslint-disable-next-line no-mixed-operators
              defaultDate: [new Date(), new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)]
            }}
          />
        </div> */}
      </CardHeader>
      <CardBody>
        <div style={{ height: '400px' }}>
          <Bar data={data} options={options} height={400} />
        </div>
      </CardBody>
    </Card>
  )
}

export default UserReport