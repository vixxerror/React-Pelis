import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import * as Yup from "yup";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import ImageField from "../forms/ImageField";
import DateField from "../forms/DateField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, {
	multipleSelectorModel,
} from "../forms/MultipleSelector";
import { useState } from "react";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import TypeAheadActor from "../forms/TypeAheadActors";
import { actorMovieDTO } from "../actors/actors.model";
import MarkdownField from "../forms/MarkdownField";

export default function MovieForm(props: movieFormProps) {
	const [selectedGenres, setSelectedGenres] = useState(
		mapToModel(props.selectedGenres)
	);
	const [nonSelectedGenres, setNonSelectedGenres] = useState(
		mapToModel(props.nonSelectedGenres)
	);

	const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(
		mapToModel(props.selectedMovieTheaters)
	);
	const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState(
		mapToModel(props.nonSelectedMovieTheaters)
	);

	const [selectedActors, setSelectedActors] = useState(props.selectedActors);

	function mapToModel(
		items: { id: number; name: string }[]
	): multipleSelectorModel[] {
		return items.map((item) => {
			return { key: item.id, value: item.name };
		});
	}

	return (
		<Formik
			initialValues={props.model}
			onSubmit={(values, actions) => {
				values.genresIds = selectedGenres.map((item) => item.key);
				values.movieTheatersIds = selectedMovieTheaters.map((item) => item.key);
				values.actors = selectedActors;
				props.onSubmit(values, actions);
			}}
			validationSchema={Yup.object({
				title: Yup.string()
					.required("Este campo es Requerido")
					.firstLetterUppercase(),
			})}>
			{(formikProps) => (
				<Form>
					<TextField displayName="Titulo" field="title" />
					<CheckboxField displayName="En cine" field="inTheaters" />
					<TextField displayName="Trailer" field="trailer" />
					<DateField displayName="Fecha de lanzamiento" field="releaseDate" />
					<ImageField
						displayName="Poster"
						field="poster"
						imageURL={props.model.posterURL}
					/>

					<MarkdownField displayName="Resumen" field="summary" />

					<MultipleSelector
						displayName="Genero"
						nonSelected={nonSelectedGenres}
						selected={selectedGenres}
						onChange={(selected, nonSelected) => {
							setSelectedGenres(selected);
							setNonSelectedGenres(nonSelected);
						}}
					/>

					<MultipleSelector
						displayName="Salas de cine"
						nonSelected={nonSelectedMovieTheaters}
						selected={selectedMovieTheaters}
						onChange={(selected, nonSelected) => {
							setSelectedMovieTheaters(selected);
							setNonSelectedMovieTheaters(nonSelected);
						}}
					/>

					<TypeAheadActor
						displayName="Actores"
						actors={selectedActors}
						onAdd={(actors) => {
							setSelectedActors(actors);
						}}
						onRemove={(actor) => {
							const actors = selectedActors.filter((x) => x !== actor);
							setSelectedActors(actors);
						}}
						listUI={(actor: actorMovieDTO) => (
							<>
								{actor.name} /{" "}
								<input
									placeholder="Personaje"
									type="text"
									value={actor.character}
									onChange={(e) => {
										const index = selectedActors.findIndex(
											(x) => x.id === actor.id
										);

										const actors = [...selectedActors];
										actors[index].character = e.currentTarget.value;
										setSelectedActors(actors);
									}}
								/>
							</>
						)}
					/>

					<Button disabled={formikProps.isSubmitting} type="submit">
						Guardar Cambios
					</Button>
					<Link className="btn btn-secondary" to="/">
						Cancelar
					</Link>
				</Form>
			)}
		</Formik>
	);
}

interface movieFormProps {
	model: movieCreationDTO;
	onSubmit(
		values: movieCreationDTO,
		actions: FormikHelpers<movieCreationDTO>
	): void;
	selectedGenres: genreDTO[];
	nonSelectedGenres: genreDTO[];
	selectedMovieTheaters: movieTheaterDTO[];
	nonSelectedMovieTheaters: movieTheaterDTO[];
	selectedActors: actorMovieDTO[];
}
