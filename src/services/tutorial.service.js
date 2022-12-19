import http from "../http-common";
const formData = new FormData()
class TutorialDataService {

  download(id, link) {
    console.log(id, link)
    return http.get(`/tutorials/file?name=${link}&id=${id}`, {
      responseType: 'blob',
    })
  }

  getAll(data) {
    console.log(data)
    return http.get("/tutorials", data);
  }
  getUser(id) {
    return http.get(`/tutorials/usertutrial?title=${id}`);
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
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

    return http.post("/tutorials/", formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  }

  update(id, data) {
    console.log(id, data)

    return data && http.put(`/tutorials/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    );
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title, id) {
    return http.get(`/tutorials?title=${title}&id=${id}`);
  }
}

export default new TutorialDataService();