import { urlActors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { convertActorToFormData } from "../utils/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO, actorDTO } from "./actors.model";
import "./styles.css";

export default function EditActor() {
	function transform(actor: actorDTO): actorCreationDTO {
		return {
			name: actor.name,
			pictureURL: actor.picture,
			biography: actor.biography,
			dateOfBirth: new Date(actor.dateOfBirth),
		};
	}

	return (
		<div className="actor">
			<div className="actor_container">
				<EditEntity<actorCreationDTO, actorDTO>
					url={urlActors}
					indexURL="/actors"
					entityName="Actor"
					transformFormData={convertActorToFormData}
					transform={transform}>
					{(entity, edit) => (
						<ActorForm
							model={entity}
							onSubmit={async (values) => await edit(values)}
						/>
					)}
				</EditEntity>
			</div>
		</div>
	);
}
