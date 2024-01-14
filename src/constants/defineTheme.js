import { loader } from "@monaco-editor/react";

import monacoThemes from "monaco-themes/themes/themelist";

const defineTheme = (theme, setEditorBackgroundColor) => {
	return new Promise((res) => {
		Promise.all([
			loader.init(),
			import(
				/* webpackChunkName: "[request]" */ `../../node_modules/monaco-themes/themes/${monacoThemes[theme]}.json`
			),
		]).then(([monaco, themeData]) => {
			monaco.editor.defineTheme(theme, themeData);
			setEditorBackgroundColor(themeData.colors["editor.background"]);
			res();
		});
	});
};

export { defineTheme };
