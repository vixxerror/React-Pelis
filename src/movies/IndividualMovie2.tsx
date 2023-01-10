import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logo, testMovie } from "../assets";
import Authorized from "../auth/Authorized";
import { urlMovies } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import { movieDTO } from "./movies.model";
import "./movies_card_style.css";

const IndividualMovie2 = (props: movieDTO) => {
	const buildLink = () => `/movie/${props.id}`;
	const customAlert = useContext(AlertContext);

	function deleteMovie() {
		axios.delete(`${urlMovies}/${props.id}`).then(() => {
			customAlert();
		});
	}

	console.log(props);

	return (
		<a className="image-popup" href={buildLink()} title="">
			<div className="movie_card_body">
				<img src={props.poster} alt="logo" className="movie_card_image" />
				<div className="movie_card_container">
					<span className="movie_card_tag">{props.genres[0].name}</span>
					<h4 className="movie_card_title">{props.title}</h4>
					<p className="movie_card_time">
						{new Date(props.releaseDate).toDateString}
					</p>
				</div>
				<Authorized
					role="admin"
					authorized={
						<div className="movie_card_options">
							<Link
								style={{ marginRight: "1rem" }}
								className="movie_card_options_edit"
								to={`/movies/edit/${props.id}`}>
								Edit
							</Link>
							<Button
								onClick={() => customConfirm(() => deleteMovie())}
								className="movie_card_options_delete">
								Delete
							</Button>
						</div>
					}
				/>
			</div>
		</a>
	);
};

export default IndividualMovie2;
