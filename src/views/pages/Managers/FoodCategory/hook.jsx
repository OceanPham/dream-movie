import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_FOODCATEGORY } from '../../../../components/constantsAPI'

export const useGetALLFoodCategory = () => {
  const request = async () => {
    const res = await axios.get(`${API_FOODCATEGORY}`)
    return res.data
  }
  const query = useQuery(["foodCategories"], request, { refetchOnWindowFocus: false })
  return query
}

export const useAddFoodCategory = () => {
  const request = async (db_submit) => {
    const config = {
      method: 'post',
      url: API_FOODCATEGORY,
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


const deleteFoodCategory = async (id) => {
  const response = await axios.delete(`${API_FOODCATEGORY}/${id}`);
  return response.data;
};

export const useDeleteFoodCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteFoodCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('foodCategories');  // Refetch chair categories after delete
    },
    onError: (error) => {
      console.error('Error deleting the food category:', error);
    }
  });
};

