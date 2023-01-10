import { urlMovieTheaters } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { movieTheaterCreationDTO, movieTheaterDTO } from "./movieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";
import "./styles.css";

export default function EditMovieTheater() {
	return (
		<div className="theater">
			<div className="theater_container">
				<EditEntity<movieTheaterCreationDTO, movieTheaterDTO>
					url={urlMovieTheaters}
					indexURL="/movietheaters"
					entityName="Movie Theater">
					{(entity, edit) => (
						<MovieTheaterForm
							model={entity}
							onSubmit={async (values) => await edit(values)}
						/>
					)}
				</EditEntity>
			</div>
		</div>
	);
}
