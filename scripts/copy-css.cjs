const fs = require("node:fs/promises");
const path = require("node:path");

const sourceRoot = path.resolve(__dirname, "..", "src");
const outputRoot = path.resolve(__dirname, "..", "dist", "src");

async function copyCssFiles(sourceDir, targetDir) {
	await fs.mkdir(targetDir, { recursive: true });
	const entries = await fs.readdir(sourceDir, { withFileTypes: true });

	for (const entry of entries) {
		const sourcePath = path.join(sourceDir, entry.name);
		const targetPath = path.join(targetDir, entry.name);

		if (entry.isDirectory()) {
			await copyCssFiles(sourcePath, targetPath);
			continue;
		}

		if (entry.isFile() && entry.name.endsWith(".css")) {
			await fs.copyFile(sourcePath, targetPath);
		}
	}
}

copyCssFiles(sourceRoot, outputRoot).catch((error) => {
	console.error("Failed to copy CSS files:", error);
	process.exitCode = 1;
});
