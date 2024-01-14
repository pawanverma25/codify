import { CodeEditor, Navbar } from "./components";

function App() {
	return (
		<div className="min-h-[100svh] flex flex-col h-fit text-[#71717a]">
			<Navbar />
			<CodeEditor />
		</div>
	);
}

export default App;
