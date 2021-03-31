import React from "react";
import { Row } from "reactstrap";
import SearchBar from "./SearchBar";
import library from "../libraryIcon.svg";

function Sidebar({ test }) {
	return (
		<div>
			<SearchBar test={test} />
			<Row>
				<img
					className="offset-2 mt-5"
					src={library}
					alt=""
					style={{ width: "20px", height: "26px" }}
				></img>
				<p className="offset-1 mt-5" style={{ color: "white" }}>
					LIBRARY
				</p>
			</Row>
			<Row>
				<img
					className="offset-2 mt-5"
					src={library}
					alt=""
					style={{ width: "20px", height: "26px" }}
				></img>
				<p className="offset-1 mt-5" style={{ color: "white" }}>
					LIBRARY
				</p>
			</Row>
		</div>
	);
}

export default Sidebar;
