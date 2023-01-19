import http from "../http-common";
import authHeader from "./auth-header";
const formData = new FormData()
const user = JSON.parse(localStorage.getItem("user"));
class TutorialDataService {

  download(id, link) {
    console.log(id, link)
    return http.get(`/tutorials/file?name=${link}&id=${id}`, {
      responseType: 'blob', headers: authHeader() 
    })
  }

  getAll(data) {
    console.log(data)
    return http.get("/tutorials", data, { headers: authHeader() });
  }
  getUser(id) {
    return http.get(`/tutorials/usertutrial?title=${id}`, { headers: authHeader() });
  }

  get(id) {
    return http.get(`/tutorials/${id}`, { headers: authHeader() });
  }

  create(data) {
    const { title, description, docNumb, docDate, sentTo, sentToId, sentFrom, fileLink, seen } = data

    formData.append('file', fileLink)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('docNumb', docNumb)
    formData.append('docDate', docDate)
    formData.append('sentTo', sentTo)
    formData.append('sentToId', sentToId)
    formData.append('sentFrom', sentFrom.username)
    formData.append('sentFromId', sentFrom.id)
    formData.append('seen', seen)
    console.log( data)
    return http.post("/tutorials/", formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          "x-access-token": user.accessToken 
        }
      });

  }

  update(id, data) {
    console.log(id, data)

    return data && http.put(`/tutorials/${id}`, data, { headers: authHeader() }
    );
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/tutorials`, { headers: authHeader() });
  }

  findByTitle(title, id) {
    return http.get(`/tutorials?title=${title}&id=${id}`, { headers: authHeader() });
  }
}

export default new TutorialDataService();