import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_CHAIRCATEGORY, API_USER } from '../../../../components/constantsAPI'

export const useGetALLChairCategory = () => {
  const request = async () => {
    const res = await axios.get(`${API_CHAIRCATEGORY}`)
    return res.data
  }
  const query = useQuery(["chairCategories"], request, { refetchOnWindowFocus: false })
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


export const useAddUser = () => {
  const request = async (db_submit) => {
    const config = {
      method: 'post',
      url: API_USER,
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

export const useDeleteChairCategory = () => {
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

