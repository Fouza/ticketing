import axios from 'axios';
export const requestService = {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
    putRequest
};

function createHeader(protect,authUser,typeContent = null){
    let headers = {}
    headers['Content-type'] = typeContent === null ? "application/json" : typeContent
    if( protect ) headers['Authorization'] = `Bearer ${authUser}`
    return headers
}

function returnResponse (response,error){
    let obj = {}
    if(response){
        const res = {
            status : response.status,
            data : response.data
        }
        obj={error : false,...res}
    }else{
        const err = {
            status : error.response.status,
            data : error.response.data
        }
        obj={error : true,...err}
    }
    console.log(obj)
    return obj
}

async function getRequest(urlroot,
                          header = {protect : false,authUser : null,typeContent : null}) {
    const Header = createHeader(header.protect, header.authUser, header.typeContent)
    console.log(header)
    const {response ,error}  = await axios.get(`${urlroot}`, {headers: Header})
        .then(response => ({response}))
        .catch(error => ({error}))
    return returnResponse(response,error)
}

async function postRequest(urlroot, data,
    header = {protect : null,authUser : null,typeContent : null}) {
    const {response,error} = await axios.post(`${urlroot}`, data, {
        headers: createHeader(header.protect, header.authUser, header.typeContent)
    })
        .then(response => ({response}))
        .catch(error => ({error}))
    return returnResponse(response,error)
}

async function patchRequest(urlroot, data,
                            header = {protect : null,authUser : null,typeContent : null}) {
    const {response,error} = await axios.patch(`${urlroot}`, data, {headers: createHeader(header.protect, header.authUser, header.typeContent)})
        .then(response => ({response}))
        .catch(error => ({error}))
    return returnResponse(response,error)
}
async function deleteRequest(urlroot,
                             header = {protect : null,authUser : null,typeContent : null}) {
    const {response,error} = await axios.delete(`${urlroot}`, {
        headers: createHeader(header.protect, header.authUser)
    })
        .then(response => ({response}))
        .catch(error => ({error}))
    return returnResponse(response,error)
}

async function putRequest(urlroot, data,
                          header = {protect : null,authUser : null,typeContent : null}) {
    const {response,error} =  await axios.put(`${urlroot}`, data, {
        headers: createHeader(header.protect, header.authUser)
    })
        .then(response => ({response}))
        .catch(error => ({error}))
    return returnResponse(response,error)
}
