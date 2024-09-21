import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { API_CHAIRCATEGORY } from '../../../../components/constantsAPI'

export const useGetALLChairCategory = () => {
  const request = async () => {
    const res = await axios.get(`${API_CHAIRCATEGORY}`)
    return res.data
  }
  const query = useQuery(["listChairCategory"], request, { refetchOnWindowFocus: false })
  return query
}

export const useEditAddProfject = (id) => {
  // const request = async (db_submit) => {
  //   const config = {
  //     method: 'post',
  //     url: REST_SPAM_URL,
  //     data: {
  //       data: db_submit,
  //       token: `${getUserJWT()}`,
  //       type: 'projects',
  //       id: id
  //     },
  //     headers: {
  //       Authorization: `Bearer ${getUserJWT()}`
  //     }
  //   }
  //   const res = await axios(config)
  //   return res.data
  // }
  // const query = useMutation(request)
  // return query
  return
}

export const usePostFeatureImg = () => {
  const request = async (fileImg) => {
    const formData = new FormData()
    formData.append("files", fileImg)
    const res = await axios({
      method: "post",
      url: `${'REST_API_4'}/upload/`,
      data: formData
    })
    return res.data
  }
  const query = useMutation(request)
  return query
}