import { urlMovieTheaters } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { movieTheaterDTO } from "./movieTheater.model";
import "./styles.css";

export default function IndexMovieTheaters() {
	return (
		<div className="theater">
			<div className="theater_container">
				<IndexEntity<movieTheaterDTO>
					url={urlMovieTheaters}
					createURL="movietheaters/create"
					title="
            salas de cine"
					entityName="
            salas de cine">
					{(entities, buttons) => (
						<>
							<thead>
								<tr>
									<th scope="col">Nombre</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{entities?.map((entity) => (
									<tr key={entity.id}>
										<td>{entity.name}</td>
										<td>
											{buttons(`movietheaters/edit/${entity.id}`, entity.id)}
										</td>
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
