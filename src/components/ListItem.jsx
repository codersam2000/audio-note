import React, {useContext} from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap'
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {removeNote, download, baseURL} from '../services/note'
import { AuthContext } from '../contexts/Auth';

const ListItem = ({item})=>{
	const queryClient = useQueryClient();
    const removeNoteMutation = useMutation((id) => removeNote(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["notes"]);
        },
    });
	const authContext = useContext(AuthContext) 
	return(
		<>
		<ListGroup>
			<li className="d-flex justify-content-between align-items-start">
				<div className="list-item">
					<div className="fw-bold">{item.title}</div>
					<Row>
						<Col md="6">
							<audio controls>
							<source src= {baseURL+item.audio_file} type="audio/ogg" />
							<source src={baseURL+item.audio_file} type="audio/mpeg" />
							Your browser does not support the audio element.
							</audio>
						</Col>
						<Col md="6">
							<div className='d-flex align-items-center justify-content-end '>
								<div onClick={() => download(baseURL+item.audio, item.title)} className="btn text-success border-success">Download <i className='fas fa-download'></i></div>
								{authContext.isUserLoggedIn && (authContext.user.id === item.user) && (
									<div onClick={() => removeNoteMutation.mutate(item.id)} className="mx-2 btn text-danger border-danger">Delete <i className='fas fa-trash'></i></div>
								)}
							</div>
						</Col>
					</Row>
				</div>
			</li>
		</ListGroup>
		</>
		)
	}
export default ListItem