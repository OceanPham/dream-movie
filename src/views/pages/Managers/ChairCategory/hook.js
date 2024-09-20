import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
// import { getUserJWT } from '../../../../../auth/utils'
// import { REST_API_4, REST_SPAM_URL } from '../../../../../constants'

export const useGetListProject = (id, pages) => {
  const request = async () => {
    const time = Date.now()
    const fields = `sort=createdAt:DESC&pagination[page]=${pages}&populate[1]=upload_files&populate[2]=feature_image&pagination[pageSize]=15&filters[user_profile][user_id][$eq]=${id}&time=${time}`
    const res = await axios.get(`projects?${fields}`)
    return res.data
  }
  const query = useQuery(["listProject", pages], request, { refetchOnWindowFocus: false })
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