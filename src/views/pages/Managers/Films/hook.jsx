import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { API_FILM } from '../../../../components/constantsAPI';

export const useGetALLFilm = () => {
  const request = async () => {
    const res = await axios.get(`${API_FILM}`);
    return res.data;
  };
  const query = useQuery(["films"], request, { refetchOnWindowFocus: false });
  return query;
};

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
      queryClient.invalidateQueries('films');  // Refetch films after delete
    },
    onError: (error) => {
      console.error('Error deleting the film:', error);
    }
  });
};