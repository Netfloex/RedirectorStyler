export const createUserScript = ({
	css,
	name,
	match,
}: {
	css: string;
	name: string;
	match: string;
}) => {
	return `
// ==UserScript==
// @name ${name}
// @description Styling and tweaks for ${name}
// @author Netfloex
// @match ${match}
// @run-at document-start
// ==/UserScript==

(function () {
	let css = \`${css}\`;
	let styleNode = document.createElement("style");
	styleNode.appendChild(document.createTextNode(css));
	(document.querySelector("head") || document.documentElement).appendChild(
		styleNode,
	);
})();
	`.trim();
};
