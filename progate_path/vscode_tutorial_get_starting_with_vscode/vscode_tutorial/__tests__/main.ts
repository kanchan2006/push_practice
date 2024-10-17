import fs from "fs";
import path from "path";
import { execSync } from "child_process";

test("src/files/create_file.txt exists", () => {
  const filePath = path.join(__dirname, "../src/files/create_file.txt");
  expect(fs.existsSync(filePath)).toBe(true);
});

test("src/rename_file.txt exists", () => {
  const filePath = path.join(__dirname, "../src/rename_file.txt");
  expect(fs.existsSync(filePath)).toBe(true);
});

test("src/delete_file.txt does not exists", () => {
  const filePath = path.join(__dirname, "../src/delete_file.txt");
  expect(fs.existsSync(filePath)).toBe(false);
});

test("users on src/multi_cursor/users.json must have user_id", () => {
  const filePath = path.join(__dirname, "../src/multi_cursor/users.json");
  const file = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(file);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users.forEach((user: any) => {
    expect(user.user_id).toBeDefined();
  });
});

test("user names on src/search_and_replace/users.json must start with yamada", () => {
  const filePath = path.join(__dirname, "../src/search_and_replace/users.json");
  const file = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(file);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users.forEach((user: any) => {
    expect(user.name).toMatch(/^yamada/);
  });
});

test("user names on files under src/search_and_replace_all must start with yamada", () => {
  const dirPath = path.join(__dirname, "../src/search_and_replace_all");
  const files = fs.readdirSync(dirPath);
  files.forEach((fileName) => {
    const file = fs.readFileSync(path.join(dirPath, fileName), "utf8");
    const users = JSON.parse(file);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    users.forEach((user: any) => {
      expect(user.name).toMatch(/^yamada/);
    });
  });
});

test("the second line on src/comment_out/main.ts must be commented out", async () => {
  const filePath = path.join(__dirname, "../src/comment_out/main.js");
  const file = fs.readFileSync(filePath, "utf8");
  file.split("\n").forEach((line, i) => {
    if (i === 1) {
      expect(line.trim().startsWith("//")).toBe(true);
    }
  });
});

test("errors in src/quick_fix/main.ts must be resolved", async () => {
  expect(() => {
    execSync("npm run typecheck -- src/quick_fix/main.ts");
  }).not.toThrow();
});

test("the function name on src/rename_symbol/main.ts must be avg", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imported = (await import("../src/rename_symbol/main")) as any;
  expect(imported.avg).toBeDefined();
});
