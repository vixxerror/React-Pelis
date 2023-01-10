import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { urlMovies, urlRatings } from "../endpoints";
import coordinateDTO from "../utils/coordinates.model";
import Loading from "../utils/Loading";
import Map from "../utils/Map";
import { movieDTO } from "./movies.model";
import Ratings from "../utils/Ratings";
import Swal from "sweetalert2";
import "./movies_style.css";

export default function MovieDetails() {
	const { id }: any = useParams();
	const [movie, setMovie] = useState<movieDTO>();

	useEffect(() => {
		axios
			.get(`${urlMovies}/${id}`)
			.then((response: AxiosResponse<movieDTO>) => {
				response.data.releaseDate = new Date(response.data.releaseDate);
				setMovie(response.data);
				console.log(movie);
			});
	}, [id]);

	function transformCoordinates(): coordinateDTO[] {
		if (movie?.movieTheaters) {
			const coordinates = movie.movieTheaters.map((movieTheater) => {
				return {
					lat: movieTheater.latitude,
					lng: movieTheater.longitude,
					name: movieTheater.name,
				} as coordinateDTO;
			});

			return coordinates;
		}

		return [];
	}

	function generateEmbeddedVideoURL(trailer: string): string {
		if (!trailer) {
			return "";
		}

		let videoId = trailer.split("v=")[1];
		const ampersandPosition = videoId.indexOf("&");
		if (ampersandPosition !== -1) {
			videoId = videoId.substring(0, ampersandPosition);
		}

		return `https://www.youtube.com/embed/${videoId}`;
	}

	function handleRate(rate: number) {
		axios.post(urlRatings, { rating: rate, movieId: id }).then(() => {
			Swal.fire({ icon: "success", title: "Rating received" });
		});
	}

	return movie ? (
		<div className="movie">
			<div className="movie_container">
				<h2 className="movie_title">
					{movie.title} ({movie.releaseDate.getFullYear()})
				</h2>
				<div className="movie_tags">
					{movie.genres?.map((genre) => (
						<Link
							key={genre.id}
							style={{ marginRight: "5px" }}
							className="btn btn-primary btn-sm rounded-pill"
							to={`/movies/filter?genreId=${genre.id}`}>
							{genre.name}
						</Link>
					))}
				</div>
				{movie.releaseDate.toDateString()}| Tu voto:
				<div className="movie_tags">
					<Ratings
						maximumValue={5}
						selectedValue={movie.userVote}
						onChange={handleRate}
					/>
					| Voto Promedio: {movie.averageVote}
				</div>
				<div style={{ display: "flex", marginTop: "1rem" }}>
					<span style={{ display: "inline-block", marginRight: "1rem" }}>
						<img
							src={movie.poster}
							style={{ width: "225px", height: "315px" }}
							alt="poster"
						/>
					</span>
					{movie.trailer ? (
						<div>
							<iframe
								title="youtube-trailer"
								width="560"
								height="315"
								src={generateEmbeddedVideoURL(movie.trailer)}
								frameBorder={0}
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen></iframe>
						</div>
					) : null}
				</div>
				{movie.summary ? (
					<div style={{ marginTop: "1rem" }}>
						<h3>Resumen</h3>
						<div>
							<ReactMarkdown>{movie.summary}</ReactMarkdown>
						</div>
					</div>
				) : null}
				{movie.actors && movie.actors.length > 0 ? (
					<div style={{ marginTop: "1rem" }}>
						<h3 className="movie_title_details">Actores</h3>
						<div style={{ display: "flex", flexDirection: "column" }}>
							{movie.actors?.map((actor) => (
								<div
									className="movie_details_actor_tag"
									key={actor.id}
									style={{ marginBottom: "2px" }}>
									<img
										alt="pic"
										src={actor.picture}
										className="movie_details_actor_img"
										style={{ width: "50px", verticalAlign: "middle" }}
									/>
									<span
										style={{
											display: "inline-block",
											width: "200px",
											marginLeft: "1rem",
											color: "white",
										}}>
										{actor.name}
									</span>
									<span
										style={{
											display: "inline-block",
											width: "45px",
											color: "white",
										}}>
										...
									</span>
									<span>{actor.character}</span>
								</div>
							))}
						</div>
					</div>
				) : null}
				{movie.movieTheaters && movie.movieTheaters.length > 0 ? (
					<div className="theater_map">
						<h2 className="movie_title_details">Miralo en:</h2>
						<Map coordinates={transformCoordinates()} readOnly={true} />
					</div>
				) : null}
			</div>
		</div>
	) : (
		<Loading />
	);
}
