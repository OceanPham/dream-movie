import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_CHAIRCATEGORY, API_CINEMA, API_LANGUAGE, API_MOVIE, API_ROOM, API_ScreeningFormat, API_ScreeningType, API_SHOWTIME, API_USER, API_VOUCHER } from '../../../../components/constantsAPI'

export const useGetALLChairCategory = () => {
  const request = async () => {
    const res = await axios.get(`${API_CHAIRCATEGORY}`)
    return res.data
  }
  const query = useQuery(["chairCategories"], request, { refetchOnWindowFocus: false })
  return query
}

export const useGetALLShowTime = () => {
  const request = async () => {
    const res = await axios.get(`${API_SHOWTIME}`)
    return res.data
  }
  const query = useQuery(["showtime"], request, { refetchOnWindowFocus: false })
  return query
}

export const useGetALLCinema = () => {
  const request = async () => {
    const res = await axios.get(`${API_CINEMA}`)
    return res.data
  }
  const query = useQuery(["cinemas"], request, { refetchOnWindowFocus: false })
  return query
}

export const useGetALLUser = () => {
  const request = async () => {
    const res = await axios.get(`${API_USER}`)
    return res.data
  }
  const query = useQuery(["users"], request, { refetchOnWindowFocus: false })
  return query
}

export const useGetALLRoom = () => {
  const request = async () => {
    const res = await axios.get(`${API_ROOM}`)
    return res.data
  }
  const query = useQuery(["rooms"], request, { refetchOnWindowFocus: false })
  return query
}

export const useGetALLMovie = () => {
  const request = async () => {
    const res = await axios.get(`${API_MOVIE}`)
    return res.data
  }
  const query = useQuery(["movies"], request, { refetchOnWindowFocus: false })
  return query
}


export const useGetALLScreeningFormat = () => {
  const request = async () => {
    const res = await axios.get(`${API_ScreeningFormat}`)
    return res.data
  }
  const query = useQuery(["screening_formats"], request, { refetchOnWindowFocus: false })
  return query
}

export const useGetALLScreeningType = () => {
  const request = async () => {
    const res = await axios.get(`${API_ScreeningType}`)
    return res.data
  }
  const query = useQuery(["screeningtypes"], request, { refetchOnWindowFocus: false })
  return query
}

export const useGetALLLanguage = () => {
  const request = async () => {
    const res = await axios.get(`${API_LANGUAGE}`)
    return res.data
  }
  const query = useQuery(["languages"], request, { refetchOnWindowFocus: false })
  return query
}


export const useGetALLVoucher = () => {
  const request = async () => {
    const res = await axios.get(`${API_VOUCHER}`)
    return res.data
  }
  const query = useQuery(["vouchers"], request, { refetchOnWindowFocus: false })
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

export const useAddShowTime = () => {
  const request = async (db_submit) => {
    const config = {
      method: 'post',
      url: API_SHOWTIME,
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

