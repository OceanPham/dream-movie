import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_VOUCHER } from '../../../../components/constantsAPI'

export const useGetALLVoucher = () => {
  const request = async () => {
    const res = await axios.get(`${API_VOUCHER}`)
    return res.data
  }
  const query = useQuery(["voucher"], request, { refetchOnWindowFocus: false })
  return query
}

export const useAddVoucher = () => {
  const request = async (db_submit) => {
    const config = {
      method: 'post',
      url: API_VOUCHER,
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


const deleteVoucher = async (id) => {
  const response = await axios.delete(`${API_VOUCHER}/${id}`);
  return response.data;
};

export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteVoucher, {
    onSuccess: () => {
      queryClient.invalidateQueries('chairCategories');  // Refetch chair categories after delete
    },
    onError: (error) => {
      console.error('Error deleting the chair category:', error);
    }
  });
};

