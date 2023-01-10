import { urlGenres } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import GenreForm from "./GenreForm";
import { genreCreationDTO, genreDTO } from "./genres.model";
import "./styles.css";

export default function EditGenre() {
	return (
		<div className="genre">
			<div className="genre_container">
				<EditEntity<genreCreationDTO, genreDTO>
					url={urlGenres}
					entityName="Genres"
					indexURL="/genres">
					{(entity, edit) => (
						<GenreForm
							model={entity}
							onSubmit={async (value) => {
								await edit(value);
							}}
						/>
					)}
				</EditEntity>
			</div>
			/
		</div>
	);
}
