import { generateCodeHtml } from "@/lib/code-to-html";
import {
	CodeContent,
	CodeCopyButton,
	CodeDisplay,
	CodeHeader,
	CodeList,
	Codes as CodesComponent,
	CodeTrigger,
} from "@/registry/br-hr/blocks/codes";

const Codes = async () => {
	const code = `const hello = "world";`;
	const html = await generateCodeHtml(code, "tsx");

	return (
		<CodesComponent defaultValue="code-1">
			<CodeHeader>
				<CodeList>
					<CodeTrigger value="code-1">
						<span>demo.tsx</span>
					</CodeTrigger>
				</CodeList>
				<CodeCopyButton />
			</CodeHeader>
			<CodeContent value="code-1" code={code}>
				<CodeDisplay html={html} />
			</CodeContent>
		</CodesComponent>
	);
};

export default Codes;
