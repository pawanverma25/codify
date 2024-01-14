import { Editor } from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import { IoCodeDownload } from "react-icons/io5";
import {
	languageOptions,
	selectStyles,
	defineTheme,
	gradientsList,
	backgroundColorList,
} from "../constants";
import Select from "react-select";
import { toPng } from "html-to-image";
import monacoThemes from "monaco-themes/themes/themelist";

function CodeEditor() {
	const [language, setLanguage] = useState(languageOptions[26]);
	const [theme, setTheme] = useState("vs-dark");
	const [editorBackgroundColor, setEditorBackGroundColor] =
		useState("#1b2b34");
	const [background, setBackGround] = useState(
		"bg-gradient-to-r from-fuchsia-500 to-cyan-500"
	);
	const [bgMenuOpen, setBgMenuOpen] = useState(false);
	const [bgMenuType, setBgMenuType] = useState(true);
	const ideRef = useRef(null);

	const [editorHeight, setEditorHeight] = useState(null);

	const handleMountIde = (editor) => {
		ideRef.current = editor;
		const contentHeight = Math.max(
			95,
			ideRef.current.getModel().getLineCount() * 19
		);
		setEditorHeight(contentHeight);
	};

	const handleChange = () => {
		setEditorHeight(
			Math.max(95, ideRef.current.getModel().getLineCount() * 19)
		);
	};
	const editorRef = useRef(null);
	const code = `// This is a sample JavaScript code.\nconst findFactorial = (num) => {\n\tif (num === 1) return 1;\n\treturn num * findFactorial;\n}`;

	useEffect(() => {
		defineTheme("oceanic-next", setEditorBackGroundColor).then(() =>
			setTheme({ value: "oceanic-next", label: "Oceanic Next" })
		);
	}, []);

	return (
		<div
			className="flex-1 w-98 py-16 flex flex-col gap-8"
			onClick={() => {
				if (bgMenuOpen) setBgMenuOpen(false);
			}}>
			<div className="flex justify-stretch p-2 mx-auto gap-2 rounded-md bg-slate-100 lg:w-[60%] md:w-[80%] sm:w-[90%] w-[95%]">
				<Select
					styles={selectStyles}
					className="max-w-60 min-w-32"
					classNamePrefix="bg-white"
					defaultValue={languageOptions[0]}
					isSearchable={true}
					name="language"
					onChange={setLanguage}
					value={language}
					options={languageOptions}
				/>
				<Select
					styles={selectStyles}
					className="max-w-60 min-w-32"
					classNamePrefix="bg-white"
					isSearchable={true}
					name="theme"
					value={theme}
					onChange={async (th) => {
						await defineTheme(th.value, setEditorBackGroundColor);
						setTheme(th);
					}}
					options={Object.entries(monacoThemes).map(
						([themeId, themeName]) => ({
							label: themeName,
							value: themeId,
							key: themeId,
						})
					)}
				/>
				<div className="relative p-1 border rounded-[4px] border-[#cccccc] flex-1 flex bg-white justify-center font-semibold">
					<button
						className={`rounded-[4px] flex-1 bg-white h-full ${background}`}
						onClick={() => setBgMenuOpen(!bgMenuOpen)}></button>

					{bgMenuOpen && (
						<div
							autoFocus={true}
							className="absolute z-10 w-80 bg-white rounded-[4px] border border-[#cccccc] top-12 flex flex-col mx-auto p-5 gap-3">
							<div className="bg-[#f1f5f9] h-12 flex p-2 rounded-[4px] gap-2">
								<button
									className={`flex-1 rounded-[4px] ${
										bgMenuType ? "bg-white shadow-sm" : ""
									}`}
									onClick={() => setBgMenuType(true)}>
									Gradient
								</button>
								<button
									className={`flex-1 rounded-[4px] ${
										bgMenuType ? "" : "bg-white shadow-sm"
									}`}
									onClick={() => setBgMenuType(false)}>
									Color
								</button>
							</div>
							<div className="flex flex-wrap justify-between gap-3">
								{(bgMenuType
									? gradientsList
									: backgroundColorList
								).map((gradient, index) => (
									<div
										key={"gradient-" + index}
										className={`w-8 h-8 rounded-full ${gradient}`}
										onClick={() => {
											setBackGround(gradient);
											setBgMenuOpen(false);
										}}></div>
								))}
							</div>
						</div>
					)}
				</div>
				<button
					onClick={() => {
						toPng(editorRef.current, { cacheBust: false })
							.then((dataUrl) => {
								const link = document.createElement("a");
								link.download = "my-image-name.png";
								link.href = dataUrl;
								link.click();
							})
							.catch((err) => {
								console.log(err);
							});
					}}
					className="border p-2 rounded-[4px] flex-1 bg-[#dc2626] text-white border-[#cccccc] font-semibold flex justify-center items-center gap-2">
					<IoCodeDownload size={20} />
					Export
				</button>
			</div>
			<div
				ref={editorRef}
				className={`mx-auto p-[60px] rounded-lg lg:w-[60%] md:w-[80%] sm:w-[90%] w-[95%] ${background}`}>
				<div
					style={{ backgroundColor: editorBackgroundColor }}
					className="p-6 pt-0 flex-col flex rounded-xl text-white">
					<div className="h-12 flex items-center gap-2">
						<div className="bg-[#ef4444] w-3 h-3 rounded-full"></div>
						<div className="bg-[#eab308] w-3 h-3 rounded-full"></div>
						<div className="bg-[#22c55e] w-3 h-3 rounded-full"></div>
					</div>
					<Editor
						height={editorHeight}
						options={{
							minimap: {
								enabled: false,
							},
							fontSize: 18,
							lineHeight: 19,
							scrollBeyondLastLine: false,
							wordWrap: "on",
							wrappingStrategy: "advanced",
							lineNumbers: "off",
							glyphMargin: false,
							folding: false,
							automaticLayout: true,
							lineDecorationsWidth: 0,
							lineNumbersMinChars: 0,
							renderLineHighlight: "none",
							overviewRulerLanes: 0,
							hideCursorInOverviewRuler: true,
							scrollbar: {
								vertical: "hidden",
							},
							overviewRulerBorder: false,
							renderIndentGuides: false,
						}}
						theme={theme.value}
						language={language.value}
						defaultValue={code}
						onMount={handleMountIde}
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	);
}

export default CodeEditor;
