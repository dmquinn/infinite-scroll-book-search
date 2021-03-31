import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { Spinner, Col } from "reactstrap";
import BookCard from "./components/BookCard";
import Sidebar from "./components/Sidebar";

function App() {
	const [loading, setLoading] = useState(false);
	const [cards, setCards] = useState([]);

	function test(testArray) {
		if (testArray.length > 0) {
			setCards(testArray);
		}
	}
	// const mainHeader = () => {
	// 	return (
	// 		<>
	// 			<Col lg={3}>
	// 				<Sidebar test={test} />
	// 			</Col>
	// 		</>
	// 	);
	// };

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

	useEffect(() => {
		axios.get`https://www.googleapis.com/books/v1/volumes?q=penguin+classics&maxResults=20&startIndex=1`
			.then((res) => {
				if (res.data.items.length > 0) {
					// console.log("res.data", res.data);
					setCards(res.data.items);
					// test(res.data.items);
					setLoading(false);
				}
			})
			.catch((err) => {
				setLoading(true);
				console.log(err.response);
			});
	}, []);
	return (
		<div>
			{/* <Col lg={4}> */}
			<Sidebar />
			{/* </Col> */}
			{/* {mainHeader()} */}
			<Col lg={8} className="offset-4">
				{" "}
				{handleCards()}
			</Col>
		</div>
	);
}

export default App;
