import ticketActions from './actions'

const initialState = {
	tickets:[],
	myTickets:[],
    loading: false,
    error:null,
	secondLoad:false,
	secondLoadMyTicket:false,
	successPris:false,
	errorAction:''
}

export default function ticketsReducers(state = initialState, action) {
    switch (action.type) {
        case ticketActions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}