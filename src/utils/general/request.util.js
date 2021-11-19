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
	headers['Access-Control-Allow-Credentials'] = "true"
	// headers['Access-Control-Request-Headers'] = "X-Requested-With, Content-Type, X-Token-Auth, Authorization"
   	// headers['Access-Control-Allow-Origin'] = "http://localhost:3000"
	// headers['Access-Control-Allow-Methods'] = "*"
	// headers['Access-Control-Request-Method'] = "POST"

	headers['Accept'] = "application/json"
	headers['Content-Type'] = typeContent === null ? "application/json" : typeContent
	// headers['Accept'] = "application/json"
	// headers['mode'] = "cors"
	// headers['Accept'] = "application/json"
	// headers['credentials'] = "same-origin"
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
    return obj
}

async function getRequest(urlroot,
                          header = {protect : false,authUser : null,typeContent : null}) {
    const Header = createHeader(header.protect, header.authUser, header.typeContent)
    const {response ,error}  = await axios.get(`${urlroot}`, {headers: Header})
        .then(response => ({response}))
        .catch(error => ({error}))
    return returnResponse(response,error)
}

async function postRequest(urlroot, data,
    header = {protect : null,authUser : null,typeContent : null}) {
    const {response,error} = await axios.post(`${urlroot}`, data, 
	{	
		
		withCredentials:true,
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
