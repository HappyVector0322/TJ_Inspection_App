import http from '../const/http-common'

const submitData = (info) => {
  return http.post('/process', info);
}
const userService = {
  submitData
}

export default userService