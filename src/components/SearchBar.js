import React, { useState } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import axios from "axios";

function SearchBar({ test }) {
	const [startIndex, setStartIndex] = useState(1);
	const [query, setQuery] = useState("");
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		console.log("submitted");
		setLoading(true);

		axios
			.get(
				`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&startIndex=${startIndex}`
			)
			.then((res) => {
				if (startIndex >= res.data.totalItems || startIndex < 1) {
					console.log("toast error");
				} else {
					if (res.data.items.length > 0) {
						console.log("res.data", res.data);
						// setCards(res.data.items);
						test(res.data.items);
						setLoading(false);
					}
				}
			})
			.catch((err) => {
				setLoading(true);
				console.log(err.response);
			});
	};
	return (
		<div className="sidebar">
			<InputGroup size="lg" className="mt-5">
				<input
					className="search offset-1"
					placeholder="Book Search"
					onChange={(e) => setQuery(e.target.value)}
				/>
				<InputGroupAddon addonType="append">
					<button onClick={handleSubmit} className="searchButton">
						<i className="fas fa-search"></i>
					</button>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}

export default SearchBar;
