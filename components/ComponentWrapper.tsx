import { Code } from "lucide-react";
import type React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { baseUrl } from "@/lib/base-url";
import { Button } from "./ui/button";
import { CodeBlock } from "./ui/code-block";

type ComponentWrapperProps = {
	children: React.ReactNode;
	title: string;
	description?: string;
	name: string;
};

const ComponentWrapper = ({
	children,
	title,
	description,
	name,
}: ComponentWrapperProps) => {
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
	return (
		<div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative w-full ">
			<div className="flex justify-between">
				<div>
					<h2 className="text-sm text-muted-foreground ">{title}</h2>
					{description && (
						<p className="text-sm text-muted-foreground">{description}</p>
					)}
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">
							<Code />
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-4xl pt-10">
						<DialogTitle>{title}</DialogTitle>
						<div className="mt-4  overflow-y-auto">
							<CodeBlock
								groups={["pnpm", "npm", "yarn", "bun"]}
								codes={codes}
							/>
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div className="flex items-center justify-center min-h-[400px] relative">
				{children}
			</div>
		</div>
	);
};

export default ComponentWrapper;
