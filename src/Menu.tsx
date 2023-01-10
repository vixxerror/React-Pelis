import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthenticationContext from "./auth/AuthenticationContext";
import Authorized from "./auth/Authorized";
import { logout } from "./auth/handleJWT";
import Button from "./utils/Button";
import "./nav_style.css";
import { logo } from "./assets";

export default function Menu() {
	const { update, claims } = useContext(AuthenticationContext);

	function getUserEmail(): string {
		return claims.filter((x) => x.name === "email")[0]?.value;
	}

	return (
		<nav className="r_nav">
			<div className="content">
				<div className="logo">
					<img
						className="logo_icon"
						src={logo}
						alt="logo"
						width={50}
						height={50}
					/>
					<NavLink className="logo_title" to="/">
						React Movies
					</NavLink>
				</div>

				<Authorized
					role="admin"
					authorized={
						<div className="options">
							<div className="options_auth">
								<div>
									<NavLink to="/genres" className="option_item">
										Generos
									</NavLink>
								</div>
								<div className="option_item">
									<NavLink to="/actors" className="option_item">
										Actores
									</NavLink>
								</div>
								<div className="option_item">
									<NavLink to="/movietheaters" className="option_item">
										Salas de Cine
									</NavLink>
								</div>
								<div className="option_item">
									<NavLink to="/movies/create" className="option_item">
										Crear Peliculas
									</NavLink>
								</div>
								<div className="option_item">
									<NavLink to="/users" className="option_item">
										Usuarios
									</NavLink>
								</div>
							</div>
						</div>
					}
				/>

				<Authorized
					authorized={
						<div className="options">
							<span className=" options_tag_name">
								Hello, <b>{getUserEmail()}</b>
							</span>
							<Button
								className="options_item_logout"
								onClick={() => {
									logout();
									update([]);
								}}>
								Log out
							</Button>
						</div>
					}
					notAuthorized={
						<div className="options">
							<Link to="/register" className="options_item_register">
								Register
							</Link>
							<Link to="/login" className="options_item_login">
								Login
							</Link>
						</div>
					}
				/>
			</div>
		</nav>
	);
}
