import { baseUrl } from "@/lib/base-url";
import { CodeBlock } from "../ui/code-block";

const CodesCLI = async ({ name }: { name: string }) => {
	const codes = [
		{
			lang: "sh",
			code: `pnpx shadcn@latest add ${baseUrl()}/api/r/${name}`,
			group: "pnpm",
		},
		{
			lang: "sh",
			code: `npx shadcn@latest add ${baseUrl()}/api/r/${name}`,
			group: "npm",
		},
		{
			lang: "sh",
			code: `yarn shadcn@latest add ${baseUrl()}/api/r/${name}`,
			group: "yarn",
		},
		{
			lang: "sh",
			code: `bunx --bun shadcn@latest add ${baseUrl()}/api/r/${name}`,
			group: "bun",
		},
	];

	return <CodeBlock groups={["pnpm", "npm", "yarn", "bun"]} codes={codes} />;
};

export default CodesCLI;
