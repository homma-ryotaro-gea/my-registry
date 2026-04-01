"use client";

import { pdf } from "@react-pdf/renderer";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { PdfContents } from "../../components/pdf-viewer/PdfContents";
import type { PdfRowType } from "../../components/pdf-viewer/type";

const PDFViewerPage = () => {
	const [downloading, setDownloading] = useState(false);
	const [title, setTitle] = useState("");
	const [rows, setRows] = useState<PdfRowType[]>([]);

	const handleDownload = useCallback(async () => {
		const currentTitle = title || "タイトル";
		const currentRows = rows.map((row) => ({
			label: row.label,
			value: row.value,
		}));

		setDownloading(true);
		try {
			const blob = await pdf(
				<PdfContents
					data={{
						title: currentTitle,
						rows: currentRows,
					}}
				/>,
			).toBlob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${currentTitle}.pdf`;
			a.rel = "noopener";
			a.click();
			queueMicrotask(() => URL.revokeObjectURL(url));
		} finally {
			setDownloading(false);
		}
	}, [rows, title]);

	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<button
					type="button"
					onClick={() => void handleDownload()}
					disabled={downloading || title === ""}
					className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
				>
					{downloading ? "生成中…" : "PDFをダウンロード"}
				</button>
			</div>
			<div className="grid grid-cols-2">
				<div className="min-w-5xl mx-auto space-y-4 border p-4">
					<Label>タイトル</Label>
					<Input value={title} onChange={(e) => setTitle(e.target.value)} />
					<Label>ラベル・値</Label>
					<div className="space-y-2">
						{rows.map((row) => (
							<div key={row.id} className="flex items-start gap-2">
								<Input
									value={row.label}
									onChange={(e) => {
										e.preventDefault();
										setRows((prev) =>
											prev.map((r) =>
												r.id === row.id ? { ...r, label: e.target.value } : r,
											),
										);
									}}
								/>
								<Textarea
									value={row.value}
									onChange={(e) => {
										e.preventDefault();
										setRows((prev) =>
											prev.map((r) =>
												r.id === row.id ? { ...r, value: e.target.value } : r,
											),
										);
									}}
									className="min-h-9"
								/>
								<Button
									variant="ghost"
									onClick={() =>
										setRows((prev) => prev.filter((r) => r.id !== row.id))
									}
									className="hover:bg-destructive/10"
								>
									<MinusCircle className="size-4 text-destructive" />
								</Button>
							</div>
						))}
						<Button
							variant="outline"
							onClick={() =>
								setRows((prev) => [
									...prev,
									{ id: crypto.randomUUID(), label: "", value: "" },
								])
							}
						>
							<PlusCircle className="size-4" />
						</Button>
					</div>
				</div>

				<div className="min-w-5xl mx-auto max-w-5xl space-y-4 border p-4">
					<h1
						className={cn(
							"text-2xl font-bold text-center whitespace-pre-wrap break-words",
							!title && "text-muted-foreground",
						)}
					>
						{title || "タイトル"}
					</h1>
					{rows.length > 0 && (
						<div className="w-full border border-black text-sm divide-y divide-black">
							{rows.map((row) => (
								<div
									key={row.id}
									className="grid grid-cols-2 divide-x divide-black"
								>
									<p
										className={cn(
											"w-full p-1 whitespace-pre-wrap flex items-center",
											!row.label && "text-muted-foreground",
										)}
									>
										{row.label || "ラベル"}
									</p>
									<p
										className={cn(
											"w-full p-1 whitespace-pre-wrap",
											!row.value && "text-muted-foreground",
										)}
									>
										{row.value || "値"}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PDFViewerPage;
