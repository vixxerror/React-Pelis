import React from "react";
import { IconFacebook, IconInstagram, IconLinkdeIn } from "./assets";
import "./footer_style.css";

type Props = {};

const Footer = (props: Props) => {
	return (
		<footer className="footer_body">
			<div>
				<p>
					<b>Creado por</b> <span className="footer_brand">MoviesTecsup. </span>
					<span className="footer_text">
						Derechos reservados {new Date().getFullYear().toString()}
					</span>
				</p>
			</div>
			<div className="footer_social">
				<p className="footer_text">Siguenos en: </p>
				<img
					src={IconInstagram}
					alt="Instagram"
					color="white"
					width={28}
					height={28}
				/>

				<img src={IconLinkdeIn} alt="LinkedIn" width={28} height={28} />
				<img src={IconFacebook} alt="Facebook" width={28} height={28} />
			</div>
		</footer>
	);
};

export default Footer;
