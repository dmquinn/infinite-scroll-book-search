import React, { useState } from "react";
import "./index.css";
import {
	InputGroup,
	Input,
	InputGroupAddon,
	Button,
	Spinner,
} from "reactstrap";
import axios from "axios";
import BookCard from "./components/BookCard";
import Sidebar from "./components/Sidebar";

function App({ results }) {
	const [maxResults, setMaxResults] = useState(20);
	const [startIndex, setStartIndex] = useState(1);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [cards, setCards] = useState([]);

	// Main Show Case
	const mainHeader = (props) => {
		console.log(props);
		return (
			<>
				<Sidebar results={results} />
			</>
		);
	};

	const handleCards = () => {
		if (loading) {
			return (
				<div className="d-flex justify-content-center mt-3">
					<Spinner style={{ width: "3rem", height: "3rem" }} />
				</div>
			);
		} else {
			const items = cards.map((item, i) => {
				let thumbnail = "";
				if (item.volumeInfo.imageLinks) {
					thumbnail = item.volumeInfo.imageLinks.thumbnail;
				}

				return (
					<div className="col-lg-4 mb-3" key={item.id}>
						<BookCard
							thumbnail={thumbnail}
							title={item.volumeInfo.title}
							pageCount={item.volumeInfo.pageCount}
							language={item.volumeInfo.language}
							authors={item.volumeInfo.authors}
							publisher={item.volumeInfo.publisher}
							description={item.volumeInfo.description}
							previewLink={item.volumeInfo.previewLink}
							infoLink={item.volumeInfo.infoLink}
						/>
					</div>
				);
			});
			return (
				<div className="container my-5">
					<div className="row">{items}</div>
				</div>
			);
		}
	};
	return (
		<div className="w-100 h-100">
			{mainHeader()}
			{handleCards()}
		</div>
	);
}

export default App;
