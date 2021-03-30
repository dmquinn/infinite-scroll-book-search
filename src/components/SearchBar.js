import React, { useState } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import axios from "axios";

function SearchBar() {
	const [maxResults, setMaxResults] = useState(20);
	const [startIndex, setStartIndex] = useState(1);
	const [query, setQuery] = useState("");
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		setLoading(true);
		if (maxResults > 40 || maxResults < 1) {
			console.log("error");
		} else {
			axios
				.get(
					`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
				)
				.then((res) => {
					if (startIndex >= res.data.totalItems || startIndex < 1) {
						console.log("toast error");
					} else {
						if (res.data.items.length > 0) {
							setCards(res.data.items);
							setLoading(false);
						}
					}
				})
				.catch((err) => {
					setLoading(true);
					console.log(err.response);
				});
		}
	};
	return (
		<div className="sidebar">
			<InputGroup size="lg" className="mt-5">
				<Input
					className="searchBar"
					placeholder="Book Search"
					// value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<InputGroupAddon addonType="append">
					<Button color="secondary" onClick={handleSubmit}>
						<i className="fas fa-search"></i>
					</Button>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}

export default SearchBar;
