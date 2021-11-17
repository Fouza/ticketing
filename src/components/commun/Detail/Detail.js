import { Modal, Button, Divider, List, Typography, Tag } from "antd"

function Detail({ticket, isDetailModalVisible, handleDetailOk, handleCancel}){

	const data = [
		<><span className="raleway-bold marr10 txtac wh-nowrap">Titre :</span>{`${ticket.title}`}</>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Description :</span>{`${ticket.description}`}</>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Délai :</span>{`${!ticket.deadline ? 'Non précisé' : ticket.deadline}`}</>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Remarques :</span>{`${!ticket.notes ? '/' : ticket.notes}`}</>,
		<Tag color={ticket.etat == "done" ? "blue" : "red"}>{ticket.etat === 'todo' ? 'Non effectué' : 'Effectué'}</Tag>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Pris par :</span>{`${!ticket.agent ? '/' : ticket.agent.name + ' ' + ticket.agent.lastname}`}</>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Crée par :</span>{`${!ticket.customer ? '/' : ticket.customer.name + ' ' + ticket.customer.lastname}`}</>
	]

	return (
		<Modal title={`Détail du Ticket numéro ${ticket.id}`} visible={isDetailModalVisible}
				onCancel={handleCancel} 
				footer={[
					<Button
						type="primary"
						onClick={handleDetailOk}
					>Ok</Button>
				]}>
			<List
				bordered
				dataSource={data}
				renderItem={item => (
					<List.Item>
						{item}
					</List.Item>
				)}
			/>
		</Modal>
	);
}

export default Detail