import { movieDTO } from "./movies.model";
import css from "./IndividualMovie.module.css";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlMovies } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";
import Authorized from "../auth/Authorized";

export default function IndividualMovie(props: movieDTO) {
	const buildLink = () => `/movie/${props.id}`;
	const customAlert = useContext(AlertContext);

	function deleteMovie() {
		axios.delete(`${urlMovies}/${props.id}`).then(() => {
			customAlert();
		});
	}

	return (
		<div className={css.div}>
			<div className="row gallery-wrapper">
				<div data-category="designing development">
					<div className="gallery-box card">
						<div className="gallery-container">
							<a className="image-popup" href={buildLink()} title="">
								<Link to={buildLink()}>
									<img alt="Poster" src={props.poster} />
								</Link>
								<div className="gallery-overlay">
									<h5 className="overlay-caption">
										<p>
											<Link to={buildLink()} style={{ color: "white" }}>
												{props.title}
											</Link>
										</p>
									</h5>
								</div>
							</a>
						</div>

						<div className="box-content">
							<div className="d-flex align-items-center mt-1">
								<div className="flex-grow-1 text-muted">
									<a href="" className="text-body text-truncate">
										<p>
											<Link to={buildLink()}>{props.title}</Link>
										</p>
									</a>
								</div>
								<div className="flex-shrink-0"></div>
							</div>
						</div>
						<Authorized
							role="admin"
							authorized={
								<>
									<div>
										<Link
											style={{ marginRight: "1rem" }}
											className="btn btn-info"
											to={`/movies/edit/${props.id}`}>
											Edit
										</Link>
										<Button
											onClick={() => customConfirm(() => deleteMovie())}
											className="btn btn-danger">
											Delete
										</Button>
									</div>
								</>
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
