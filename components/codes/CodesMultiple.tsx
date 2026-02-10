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

const codes = [
	{
		lang: "tsx",
		code: `const Demo = () => <div>Demo</div>;`,
		title: "demo.tsx",
	},
	{
		lang: "css",
		code: `.demo { color: red; }`,
		title: "demo.css",
	},
];
const CodesMultiple = async () => {
	const codesWithValue = await Promise.all(
		codes.map(async (item, i) => {
			const html = await generateCodeHtml(item.code, item.lang);
			return { ...item, html, value: `${i}` };
		}),
	);
	return (
		<CodesComponent defaultValue="code-1">
			<CodeHeader>
				<CodeList>
					{codesWithValue.map((item, i) => (
						<CodeTrigger key={i} value={item.value}>
							<span>{item.title}</span>
						</CodeTrigger>
					))}
				</CodeList>
				<CodeCopyButton />
			</CodeHeader>
			{codesWithValue.map((item, i) => (
				<CodeContent key={i} value={item.value} code={item.code}>
					<CodeDisplay html={item.html} />
				</CodeContent>
			))}
		</CodesComponent>
	);
};

export default CodesMultiple;
