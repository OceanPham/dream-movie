// import { useErrorHandler, useSuccessHandler } from "../../hooks/useApiHandlers"
import { toast } from "react-toastify"

export const submitForm = (data, dataAttributes, parentCallback, queryClient, editProject, featureResponse, history, screenshotResponse, editedFiles, oldData, shouldRenderFeatureImg) => {

  const idFiles = screenshotResponse && screenshotResponse?.map(item => {
    return {
      src: item?.[0]?.url || item?.src,
      name: item?.[0]?.name || item?.name,
      mime: item?.[0]?.mime || item?.mime,
      ext: item?.[0]?.ext || item?.ext,
      size: item?.[0]?.size || item?.size,
      id: item?.[0]?.id || item?.id
    }
  })

  const submitFile = [...idFiles, ...editedFiles]

  const accessTypes = {
    PRIVATE: 'private',
    PUBLIC: 'public',
    PORTFOLIO: 'portfolio'
  }
  const db_submit = {
    buy_now_link: data?.buy_now,
    document_link: data?.documentation,
    type: accessTypes.PORTFOLIO,
    website: data?.website,
    short_intro: data?.short_intro,
    feature_image: featureResponse ? (featureResponse?.[0]?.id || dataAttributes?.feature_image?.data?.id) : null,
    screenshots: submitFile
  }

  if (featureResponse === null && shouldRenderFeatureImg) delete db_submit.feature_image; //remove image field when edit without change or remove old img


  const fieldsToDelete = ['document_link', 'buy_now_link', 'download']
  fieldsToDelete.forEach(field => {
    if (!db_submit[field]) {
      delete db_submit[field]
    }
  })

  // const handleSuccess = useSuccessHandler(queryClient, ['listProject'])
  // const handleError = useErrorHandler()
  if (oldData) {
    editProject(db_submit, {
      onSuccess: () => {
        toast.success('Edit Portfolio Project Successfully!')
        setTimeout(() => {
          history.push("/apps/portfolio-project")
        }, 2500);
      },
      onError: () => toast.error('Edit Portfolio Project false!'),
    })
  } else {

    editProject(db_submit, {
      onSuccess: () => {
        toast.success('Add Portfolio Project Successfully!')
        setTimeout(() => {
          history.push("/apps/portfolio-project")
        }, 2500);
      },
      onError: () => toast.error('Add Portfolio Project false!'),
    })
  }

}