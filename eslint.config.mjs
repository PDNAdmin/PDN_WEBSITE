import next from "eslint-config-next";

const config = [
  ...next,
  { ignores: [".next/**", "node_modules/**", "public/**", "showreel/**", "assets/**", "next-env.d.ts"] },
];
export default config;
