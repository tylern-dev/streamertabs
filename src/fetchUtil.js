function status(response) {
  if(response.status >= 200 && response.status < 300){
    return Promise.resolve(response)
  }
  else {
    return Promise.reject(new Error (response.statusText))
  }
}
function json(response) {
  return response.json()
}
export const getApi = ({url='', accessToken, queryParams={}, isOauth}) => {
 return new Promise((resolve, reject)=>{
   fetch(url,{
      method: 'GET',
      headers:{
        'Authorization': `${isOauth ? 'OAuth ' : 'Bearer '}${accessToken}`

      }
    })
      .then(status)
      .then(json)
      .then((data) => resolve(data))
      .catch(error => reject(new Error(error)))

 })
}