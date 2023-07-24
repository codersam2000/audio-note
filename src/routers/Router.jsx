import { Route, BrowserRouter, Routes } from "react-router-dom";
import ProtectLoginPage from './ProtectLoginPage'
import PrivetRouter from './PrivetRouter'
import Home from '../components/pages/Home'
import Account from '../components/pages/Account'
import AddNote from '../components/pages/AddNote'
import About from '../components/pages/About'
import NoPage from '../components/pages/NoPage'
import MyNotes from "../components/pages/MyNotes";
import UserProfile from "../components/pages/UserProfile";


const Router = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/account' element={
                    <ProtectLoginPage>
                        <Account />
                    </ProtectLoginPage>
                } />
                <Route path='/' element={
                    <PrivetRouter>
                        <Home />
                    </PrivetRouter>
                } />
                <Route path='/add-note' element={
                    <PrivetRouter>
                        <AddNote />
                    </PrivetRouter>
                } />
                <Route path='/my-note' element={
                    <PrivetRouter>
                        <MyNotes />
                    </PrivetRouter>
                } />
                <Route path='/profile' element={
                    <PrivetRouter>
                        <UserProfile />
                    </PrivetRouter>
                } />
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;