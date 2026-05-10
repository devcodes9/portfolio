import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");
let errors = 0;

function validateDirectory(dir: string, requiredFields: string[]) {
  const fullPath = path.join(contentRoot, dir);
  if (!fs.existsSync(fullPath)) return;

  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(fullPath, file), "utf-8");
    const { data } = matter(raw);

    for (const field of requiredFields) {
      if (!data[field]) {
        console.error(`ERROR: ${dir}/${file} missing required field: ${field}`);
        errors++;
      }
    }
  }
}

validateDirectory("writing", ["title", "date", "description"]);
validateDirectory("notes", ["title", "date", "description"]);
validateDirectory("work", ["title", "description", "stack"]);

if (errors > 0) {
  console.error(`\n${errors} validation error(s) found.`);
  process.exit(1);
} else {
  console.log("Content validation passed.");
}
