import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
function Navbar() {
	return (
		<div className="flex justify-between items-center h-20 px-20">
			<a
				href="/"
				className="text-red-600 text-xl font-bold">
				Codify.
			</a>
			<div className="flex justify-end items-center font-semibold gap-10">
				<a
					className="flex justify-center items-center gap-1 hover:text-red-600"
					href="http://x.com/pawan_v25">
					<FaXTwitter />
					@pawan_v25
				</a>
				<a
					className="flex justify-center items-center gap-1 hover:text-red-600"
					href="/">
					<FiGithub />
					Github
				</a>
			</div>
		</div>
	);
}

export default Navbar;
