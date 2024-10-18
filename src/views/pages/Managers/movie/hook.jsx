import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_CATEGORIES, API_FILM, API_SUPPLIER } from '../../../../components/constantsAPI'
import { toast } from 'react-toastify'

export const useGetALLFilm = () => {
  const request = async () => {
    const res = await axios.get(`${API_FILM}`)
    return res.data
  }
  const query = useQuery(["film"], request, { refetchOnWindowFocus: false })
  return query
}

export const useGetALLFilmCategoryID = () => {
  const request = async (id) => {
    const res = await axios.get(`${API_CATEGORIES}`)
    return res.data
  }
  const query = useQuery(["film"], request, { refetchOnWindowFocus: false })
  return query
}

export const useGetAllSupplier = () => {
  const request = async () => {
    const res = await axios.get(`${API_SUPPLIER}`)
    return res.data
  }
  const query = useQuery(["supplier"], request, { refetchOnWindowFocus: false })
  return query
}

export const useAddFilm2 = async (data) => {  // Khai bao 1 ham bat dong bo, tu dong bien doi 1 ham thanh promise, Khi gọi tới hàm async nó sẽ xử lý mọi thứ và được trả về kết quả trong hàm của nó, Async cho phép sử dụng Await.
  const request = async (db_submit) => {
    const config = {  // doi tuong cau hinh yeu cau HTTP gui len server
      method: 'post',
      URL: API_FILM,
      data: db_submit,
      header: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios(config); // axios la 1 thu vien HTTP client dua tren Promise, giup thuc hien cac yeu cau HTTP (GET, POST, PUT, DELETE) de dang
    return res.data;
  }
}


export const useAddFilm = () => {
  const request = async (db_submit) => {
    const config = {
      method: 'post',
      url: API_FILM,
      data: db_submit,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const res = await axios(config);
    return res.data;
  };

  const mutation = useMutation(request);
  return mutation;
};


const deleteFilm = async (id) => {
  const response = await axios.delete(`${API_FILM}/${id}`);
  return response.data;
};

export const useDeleteFilm = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteFilm, {
    onSuccess: () => {
      queryClient.invalidateQueries('film');  // Refetch films after delete
    },
    onError: (error) => {
      console.error('Error deleting the film:', error);
    }
  });
};

