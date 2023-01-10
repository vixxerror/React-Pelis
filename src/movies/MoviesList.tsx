import IndividualMovie from "./IndividualMovie";
import { movieDTO } from "./movies.model";
import GenericList from "./../utils/GenericList";
import "./movies_style.css";
import IndividualMovie2 from "./IndividualMovie2";

export default function MoviesList(props: moviesListProps) {
	return (
		<GenericList list={props.movies}>
			<div className="movie_grid">
				{props.movies?.map((movie) => (
					<IndividualMovie2 {...movie} key={movie.id} />
				))}
			</div>
		</GenericList>
	);
}

interface moviesListProps {
	movies?: movieDTO[];
}
