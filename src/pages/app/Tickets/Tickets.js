import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { dispatchAction } from '../../../utils/general/dispatch.util';
import './Tickets.scss';
import ticketActions from '../../../redux/tickets/actions';
import {  Table, Input, Button, Space, Tag, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import {  SearchOutlined  } from '@ant-design/icons';
import Detail from '../../../components/commun/Detail/Detail';
import get from 'lodash';
import isEqual from 'lodash.isequal';
import { toast } from 'react-toastify';


function Tickets(){

	const {  loading, loadingPart} = useSelector(state => state.users)
	const { secondLoad, error, errorAction } = useSelector(state => state.tickets)
	const {tickets} = useSelector(state => state.tickets)

	const [data, setData] = useState([])
	const [ticket, setTicket] = useState({})

	const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

	const dispatch = useDispatch()

	useEffect(() => {
		if(error && error.length > 0 && errorAction==='assign-ticket'){
			toast.error(error)
			dispatch(dispatchAction(ticketActions.SET_STATE, {error:"", errorAction:""}))
		}
	},[error])

	useEffect(()=>{
		if(tickets != undefined && tickets.length == 0 && !secondLoad){
			dispatch(dispatchAction(ticketActions.SET_STATE, {secondLoad:true}))
			dispatch(dispatchAction(ticketActions.GET_TICKETS))
		}	
	},[])

	const getData = () =>{
		var data = []

		tickets.forEach(ticket => {
			let obj = {
				item:0,
				id:0,
				title:'',
				//description:'',
				//notes:'',
				deadline:'',
				etat:'',
				agent:'',
				customer:'',
			}
			let agent = ticket.agent
			let customer = ticket.customer
			obj.id = ticket.id
			obj.title = ticket.title
			obj.deadline = ticket.deadline
			obj.etat = ticket.etat === 'done' ? 'Effectué' : 'Non effectué'
			obj.agent = !agent ? "/" :  agent.name + " " + agent.lastname
			obj.customer = !customer ? null : customer.name + " " + customer.lastname
			data.push(obj)

		});
		return data
	}

	useEffect(()=>{
		if(tickets != undefined && tickets.length > 0){
			setData(getData())
		}
	},[tickets])

	const handlePrendre = id => {
		dispatch(dispatchAction(ticketActions.ASSIGN_TICKET, {id:id}))
	}

	const columns = [
		{
			title : 'Id',
			dataIndex : 'id',
			width: '10%',
			sorter: (a, b) => a.id - b.id,
	        sortDirections: ['descend', 'ascend'],
		},
		{
			title : 'Titre',
			dataIndex : 'title',
			width: '20%',
			render : title => {
				if(title.length > 50 ) return title.slice(0,30) + "..."
				else return title
			}
		},
		// {
		// 	title : 'Délai',
		// 	dataIndex : 'deadline',
		// 	width: '10%',
		// },
		{
			title : 'Etat',
			dataIndex : 'etat',
			width: '10%',
			filters:[
				{
					text:'Effectué',
					value:'done'
				},
				{
					text:'Non effectué',
					value:'todo'
				}
			],
			onFilter: (value, record) =>  {
				value = (value=='done' ? 'Effectué' : 'Non effectué')
				return record.etat.indexOf(value) === 0
			},
			render: etat => (
				<>
					<Tag color={etat == "Effectué" ? "blue" : "red"}>
						{etat}
					</Tag>
				</>
			)
		},
		{
			title : 'Pris par',
			dataIndex : 'agent',
			width: '20%',
		},
		{
			title : 'Crée par',
			dataIndex : 'customer',
			width: '20%',
			responsive: ['lg']
		},
		{
			title:'Actions',
			dataIndex:'actions',
			width:'20%',
			render : (text, record, index) => {
				return (
					<>
						<Button className="marr5" onClick={() => showDetailModal(record.id)}>Détails</Button>
						<Button className="" onClick={() => handlePrendre(record.id)} >Prendre</Button>
					</>
				)
			}
		}
	]

	const onChange = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	}

	const handleRefresh = () => {
		dispatch(dispatchAction(ticketActions.GET_TICKETS))
	}

	//Detail Modal
	const getDetailTicket = (id) => {
		const array = tickets.filter(ticket => ticket.id === id)
		setTicket(array[0])
	}

	const showDetailModal = (id) => {
		getDetailTicket(id)
		setIsDetailModalVisible(true);
	};

	const handleDetailOk = () => {
		setIsDetailModalVisible(false)
	};	

	const handleCancel = () => {
		setIsDetailModalVisible(false);
	};

	return(
		<div className="content flex fdc fs20 padh40">
			<div className="flex fdr jcsb padt20">
				<p>Tickets</p>
				<Button type="" onClick={handleRefresh} loading={loading && loadingPart==='refresh'}>Refresh</Button>
			</div>

			<Detail ticket={ticket} isDetailModalVisible={isDetailModalVisible} handleDetailOk={handleDetailOk} handleCancel={handleCancel} />


			<Table columns={columns} 
				dataSource={data} 
				onChange={onChange} 
				pagination={{ pageSize: 5 }} 
				scroll={{ x: 1000 }} />
		</div>
	)

}

export default Tickets