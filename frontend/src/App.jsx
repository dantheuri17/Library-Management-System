import './App.css'
// import "bootstrap/dist/css/bootstrap.min.css";


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
import EditMemberDetails from './pages/EditMemberDetails';
import BookDetails from './pages/BookDetails';
import EditBookDetails from './pages/EditBookDetails'; 
import MemberBookCheckout from './pages/MemberBookCheckout';

const App = () => {
	return (
		<Router>
				<nav className="navbar">
					<NavLink to="/" className="navbar-link">
						Home
					</NavLink>
					<NavLink to="members" className="navbar-link">
						Library Members
					</NavLink>
					<NavLink to="books" className="navbar-link">
						Books
					</NavLink>
					<NavLink to="check-out" className="navbar-link">
						Borrow Book
					</NavLink>
					<NavLink to="return" className="navbar-link">
						Return Book
					</NavLink>
				</nav>
				<main>
				<Routes>
					<Route index element={<Home />} />
					<Route path="members" element={<LibraryMembers />} />
					<Route path="books" element={<LibraryBooks />} />
					<Route path="check-out" element={<BookCheckout />} />
					<Route path="check-out" element={<BookCheckout />} />
					<Route path="return" element={<BookReturn />} />

					<Route path="member/:id" element={<MemberDetails />} />
					<Route path="member/edit/:id" element={<EditMemberDetails />} />

					<Route path="book/:id" element={<BookDetails />} />
					<Route path="book/edit/:id" element={<EditBookDetails />}></Route>

					<Route path="check-out/:id" element={<MemberBookCheckout />} />
				</Routes>
			</main>
		</Router>
	);
};

export default App;
