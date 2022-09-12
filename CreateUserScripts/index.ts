import { readFile, outputFile, emptyDir } from "fs-extra";
import { basename, join } from "path";
import { createUserScript } from "./utils/createUserScript";

import { content_scripts } from "../manifest.json";

Promise.all(
	content_scripts.map(async (styles) => {
		const outputDir = join(process.cwd(), "output");

		await emptyDir(outputDir);
		const filePath = join(process.cwd(), "..", styles.css[0]);
		const name = basename(filePath, ".css");

		const css = await readFile(filePath, "utf-8");

		const userScript = createUserScript({
			css,
			name,
			match: styles.matches[0],
		});

		await outputFile(join(outputDir, `${name}.user.js`), userScript);
		console.log("Wrote " + name);
	}),
).then(() => {
	console.log("Done");
});
