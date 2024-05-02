import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import FeedPage from '../PostFeed/FeedPage/FeedPage';
import UserProfile from '../UserProfile/UserProfile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/SignIn" element={<SignIn/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/FeedPage" element={<FeedPage/>}/>
                <Route path="/UserProfile/:username" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
