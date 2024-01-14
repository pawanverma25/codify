import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
function Footer() {
	return (
		<footer className="flex justify-between items-center py-1 px-20 font-semibold">
			<div className="flex justify-center items-center gap-2">
				<FaXTwitter />
				<a href="http://x.com/pawan_v25">@pawan_v25</a>
			</div>
			<div className="flex justify-center items-center gap-2">
				<FiGithub />
				<a href="/">Github</a>
			</div>
		</footer>
	);
}

export default Footer;
