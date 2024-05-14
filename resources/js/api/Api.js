import axios from 'axios'

export async function getComments(id, model) {
  return await axios.get('/api/comments.json', { params: { id: id, type: model } }).then((response) => {
    return response.data.comments
  })
}

export async function postComment(data) {
  let csrfToken = document.getElementById('csrf_token').value
  return await axios.post('/api/comments.json', data, {headers: {"X-CSRF-Token": csrfToken}}).then((response) => {
    return response.data.comment
  })
}

export async function editComment(id, data) {
  let csrfToken = document.getElementById('csrf_token').value
  return await axios.put(`/api/comments/${id}.json`, data, {headers: {"X-CSRF-Token": csrfToken}}).then((response) => {
    return response.data.comment
  })
}

export async function removeComment(id) {
  let csrfToken = document.getElementById('csrf_token').value
  return await axios.delete(`/api/comments/${id}.json`,{headers: {"X-CSRF-Token": csrfToken}}).then((response) => {
    return response.data
  }) 
}

export async function getForumsComments(id, model) {
  return await axios.get('/forums/comments.json', { params: { id: id, type: model } }).then((response) => {
    return response.data.forumscomments
  })
}

export async function postFormusComment(data) {
  let csrfToken = document.getElementById('csrf_token').value
  return await axios.post('/forums/comments/add.json', data, {headers: {"X-CSRF-Token": csrfToken}}).then((response) => {
      return response.data.comment
  })
}

export async function removeForumsComment(id) {
  return await axios.get('/forums/comments/delete.json', { params: { id: id } }).then((response) => {
    return response.data
  }) 
}

export async function editForumsComment(data) {
  let csrfToken = document.getElementById('csrf_token').value
  return await axios.post('/forums/comments/edit.json', data, {headers: {"X-CSRF-Token": csrfToken}}).then((response) => {
    return response.data.comment
  })
}

export async function getCountNotif() {
  return await axios.get('/api/notifications/countnotif.json').then((response) => {
      return response.data
  })   
}

export async function getNotif() {
  return await axios.get('/api/notifications/getnotif.json').then((response) => {
      return response.data
  })   
}