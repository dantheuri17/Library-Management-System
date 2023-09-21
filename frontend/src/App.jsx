// import './App.css'

import {
	BrowserRouter as Router,
	Route,
	Routes,
	NavLink,
} from "react-router-dom";
 
import Home from "./pages/Home";
import LibraryMembers from "./pages/LibraryMembers";
import LibraryBooks from "./pages/LibraryBooks";
import BookCheckout from './pages/BookCheckout'; 
import BookReturn from './pages/BookReturn'; 
import MemberDetails from './pages/MemberDetails';
// import EditMemberDetails from './pages/EditMemberDetails';

const App = () => {
	return (
		<Router>
			<main>
				<NavLink to="/">Home</NavLink>
				<NavLink to="members">Library Members</NavLink>
				<NavLink to="books">Books</NavLink>
				<NavLink to="check-out">Borrow Book</NavLink>
				<NavLink to="return">Return Book</NavLink>

				<Routes>
					<Route index element={<Home />} />
					<Route path="members" element={<LibraryMembers />} />
					<Route path="books" element={<LibraryBooks />} />
					<Route path="check-out" element={<BookCheckout />} />
					<Route path="return" element={<BookReturn />} />
					<Route path="member/:id" element={<MemberDetails />} />
					{/* <Route path="member/edit/:id" element={<EditMemberDetails />} /> */}
					

				</Routes>
				
			</main>
		</Router>
	);
};

export default App;
