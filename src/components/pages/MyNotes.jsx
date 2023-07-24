import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Container} from 'react-bootstrap'
import { useQuery } from "@tanstack/react-query"
import ListItem from '../ListItem'
import { getMyNotes } from "../../services/note"
import Nodata from '../NoData'
import LoadingSpinner from '../Spinner'
import AlertBox from '../AlertBox'

const MyNotes = ()=>{
	const {data, error, isLoading} = useQuery(['notes'], getMyNotes);
	return(
		<>
		<Header />
		<main>
			<Container>
			{isLoading && <LoadingSpinner />}
            {error && <AlertBox alert={{message:"No notes found", type:"danger"}} />}
			{data?.length === 0 && <Nodata content={{heading:'No Notes', title:'You have not create any note', text:'Create a post or go back to home page.'}}/> }
			{data?.length !== 0 && data?.map(item => (
                <ListItem key = {item.id} item = {item} />
            ))}
			</Container>
		</main>
		<Footer />
		</>
		)
	}
export default MyNotes