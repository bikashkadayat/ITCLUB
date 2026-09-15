const colors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  Markdown: "#083fa1",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
};
export const languageColor = (lang: string) => colors[lang] ?? "#8b8fa8";
