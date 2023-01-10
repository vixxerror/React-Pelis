import IndexEntity from "../utils/IndexEntity";
import { userDTO } from "./auth.models";
import { urlAccounts } from "../endpoints";
import customConfirm from "../utils/customConfirm";
import Button from "../utils/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "./styles.css";

export default function IndexUsers() {
	async function makeAdmin(id: string) {
		await doAdmin(`${urlAccounts}/makeAdmin`, id);
	}

	async function removeAdmin(id: string) {
		await doAdmin(`${urlAccounts}/removeAdmin`, id);
	}

	async function doAdmin(url: string, id: string) {
		await axios.post(url, JSON.stringify(id), {
			headers: { "Content-Type": "application/json" },
		});

		Swal.fire({
			title: "Success",
			text: "Operation finished correctly",
			icon: "success",
		});
	}

	return (
		<div className="users">
			<div className="users_container">
				<IndexEntity<userDTO> title="Usuarios" url={`${urlAccounts}/listUsers`}>
					{(users) => (
						<>
							<thead>
								<tr>
									<th>Email</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{users?.map((user) => (
									<tr key={user.id}>
										<td>{user.email}</td>
										<td>
											<Button
												className="btn btn-primary waves-effect waves-light"
												onClick={() =>
													customConfirm(
														() => makeAdmin(user.id),
														`Quieres hacer a ${user.email} administrador?`,
														"Guardar"
													)
												}>
												Crear
											</Button>

											<Button
												className="btn btn-danger bg-gradient waves-effect waves-light ms-2"
												onClick={() =>
													customConfirm(
														() => removeAdmin(user.id),
														`Quieres eliminar a ${user.email} de administrador?`,
														"Guardar"
													)
												}>
												Eliminar
											</Button>
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
