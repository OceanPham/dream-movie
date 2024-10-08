import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_CHAIRCATEGORY, API_EMPLOYEE, API_ROOM } from '../../../../components/constantsAPI'

export const useGetALLRoom = () => {
  const request = async () => {
    const res = await axios.get(`${API_ROOM}`)
    return res.data
  }
  const query = useQuery(["rooms"], request, { refetchOnWindowFocus: false })
  return query
}

export const useAddChairCategory = () => {
  const request = async (db_submit) => {
    const config = {
      method: 'post',
      url: API_CHAIRCATEGORY,
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


const deleteChairCategory = async (id) => {
  const response = await axios.delete(`${API_CHAIRCATEGORY}/${id}`);
  return response.data;
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteChairCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('chairCategories');  // Refetch chair categories after delete
    },
    onError: (error) => {
      console.error('Error deleting the chair category:', error);
    }
  });
};

