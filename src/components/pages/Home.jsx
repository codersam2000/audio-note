import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import {Container} from 'react-bootstrap'
import { useQuery } from "@tanstack/react-query"
import ListItem from '../ListItem'
import { getAllNotes } from "../../services/note"
import Nodata from '../NoData'
import AlertBox from '../AlertBox'
import LoadingSpinner from '../Spinner'

const Home = ()=>{
	const {data, isLoading, error} = useQuery(['notes'], getAllNotes);
	console.log(data)
	return(
		<>
		<Header />
		<main>
			<Container>
			{isLoading && <LoadingSpinner />}
            {error && <AlertBox alert={{message:"No notes found", type:"danger"}} />}
            {data?.length === 0 && <Nodata content={{heading:'No Notes', title:'You have not create any note', text:'Create Notes.'}} /> }
			{data?.length !== 0 && data?.map(item => (
                <ListItem key = {item.id} item = {item} />
            ))}
			</Container>
		</main>
		<Footer />
		</>
		)
	}
export default Home