import { urlActors } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { actorDTO } from "./actors.model";
import "./styles.css";

export default function IndexActors() {
	return (
		<div className="actor">
			<div className="actor_container">
				<IndexEntity<actorDTO>
					url={urlActors}
					createURL="actors/create"
					title="Actores"
					entityName="Actor">
					{(actors, buttons) => (
						<>
							<thead>
								<tr>
									<th scope="col">Nombre</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{actors?.map((actor) => (
									<tr key={actor.id}>
										<td>{actor.name}</td>
										<td>{buttons(`actors/edit/${actor.id}`, actor.id)}</td>
									</tr>
								))}
							</tbody>
						</>
					)}
				</IndexEntity>
			</div>
		</div>
	);
}
