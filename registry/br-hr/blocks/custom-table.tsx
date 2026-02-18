"use client";
import {
	flexRender,
	type RowData,
	type Table as TableType,
} from "@tanstack/react-table";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	XIcon,
} from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/br-hr/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/br-hr/ui/table";
import { getDispPage } from "@/registry/br-hr/utilities/table/index";

declare module "@tanstack/react-table" {
	interface ColumnMeta<TData extends RowData, TValue> {
		width?: string;
		minWidth?: string;
		maxWidth?: string;
	}
}

/**
 * テーブル描画用の共通コンポーネント
 * @remarks
 * `data` は各行のキーに対してセルとして描画可能な値（`ReactNode | string | number | boolean | null | undefined`）を持つレコード配列として扱います。
 */
type PropsType<TData> = {
	table: TableType<TData>;
	totalPage: number;
	bodyClassName?: string;
	rowClassName?: string;
	toastContent?: (table: TableType<TData>) => React.ReactNode;
	/**
	 * 右端のカラムを固定するかどうか
	 * @default false
	 */
	stickyRightColumn?: boolean;
};
const pageParser = {
	page_index: parseAsString.withDefault("0"),
	page_size: parseAsString.withDefault("30"),
};

const CustomTable = <TData,>(props: PropsType<TData>) => {
	const {
		table,
		totalPage,
		bodyClassName,
		rowClassName,
		toastContent,
		stickyRightColumn = false,
	} = props;

	// スクロール要素のref
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	// 前のページインデックスを追跡するref
	const prevPageIndexRef = useRef<string>("0");

	// ページインデックスの管理
	const [page, setPage] = useQueryStates(pageParser, {
		shallow: false,
	});

	const handlePageIndexChange = (value: string) => {
		setPage({ page_index: value });
	};

	// ページインデックス変更後にスクロールを一番上に戻す
	useEffect(() => {
		// ページインデックスが実際に変更された場合のみスクロールをリセット
		if (
			prevPageIndexRef.current !== page.page_index &&
			scrollContainerRef.current
		) {
			scrollContainerRef.current.scrollTop = 0;
			prevPageIndexRef.current = page.page_index;
		}
	});

	// ページネーション情報取得
	const currentPage = Number(page.page_index) ?? 0;

	// ページネーション表示情報取得
	const display = getDispPage(currentPage, totalPage);
	return (
		<div className="relative">
			<div className={cn("relative w-full", "overflow-x-auto")}>
				{/* ボディ部分 - スクロール可能 */}
				<div
					ref={scrollContainerRef}
					className={cn("max-h-[calc(100vh-380px)]", bodyClassName)}
				>
					<Table className="w-full table-fixed">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => {
								const headers = headerGroup.headers;
								const lastHeaderIndex = headers.length - 1;
								return (
									<TableRow key={headerGroup.id}>
										{headers.map((header, index) => {
											const isLastColumn =
												stickyRightColumn && index === lastHeaderIndex;
											return (
												<TableHead
													key={header.id}
													className={cn(
														"sticky top-0 bg-muted p-2 text-center font-normal",
														isLastColumn && "sticky right-0 z-20",
													)}
													style={{
														maxWidth: header.column.columnDef.meta?.maxWidth,
														minWidth: header.column.columnDef.meta?.minWidth,
														width: header.column.columnDef.meta?.width,
													}}
												>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</TableHead>
											);
										})}
									</TableRow>
								);
							})}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => {
								const cells = row.getVisibleCells();
								const lastCellIndex = cells.length - 1;
								return (
									<TableRow
										key={row.id}
										className={cn("group h-10", rowClassName)}
										data-state={row.getIsSelected() && "selected"}
									>
										{cells.map((cell, index) => {
											const isLastColumn =
												stickyRightColumn && index === lastCellIndex;
											return (
												<TableCell
													key={cell.id}
													className={cn(
														"p-0 group-hover:bg-muted",
														isLastColumn && "sticky right-0 z-10 bg-white",
													)}
													style={{
														maxWidth: cell.column.columnDef.meta?.maxWidth,
														minWidth: cell.column.columnDef.meta?.minWidth,
														width: cell.column.columnDef.meta?.width,
													}}
												>
													<div className="flex h-full w-full items-center">
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext(),
														)}
													</div>
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</div>

			{totalPage > 1 && (
				<div className="mt-4 flex items-center justify-between">
					<div className="flex items-center space-x-6 lg:space-x-8">
						<div className="flex items-center space-x-2">
							<Button
								variant="outline"
								className="hidden h-8 w-8 p-0 disabled:bg-[#E3E4EC] lg:flex"
								onClick={() => {
									handlePageIndexChange("0");
									table.toggleAllPageRowsSelected(false);
								}}
								disabled={currentPage === 0}
							>
								<ChevronsLeftIcon className="h-4 w-4 text-[#6C757D]" />
							</Button>
							<Button
								variant="outline"
								className="h-8 w-8 p-0 disabled:bg-[#E3E4EC]"
								onClick={() => {
									handlePageIndexChange((currentPage - 1).toString());
									table.toggleAllPageRowsSelected(false);
								}}
								disabled={currentPage === 0}
							>
								<span className="sr-only">Go to previous page</span>
								<ChevronLeftIcon className="h-4 w-4 text-[#6C757D]" />
							</Button>
							{display?.map((d) => {
								return (
									<div key={d.value}>
										<Button
											variant="outline"
											className={cn(
												"h-8 w-8 p-0 font-inter font-normal text-[#6C757D] text-sm disabled:bg-[#E3E4EC]",
												d.label === "..." && "cursor-default hover:bg-white",
											)}
											onClick={() => {
												table.toggleAllPageRowsSelected(false);
												if (d.label !== "...") {
													table.setPageIndex(d.value - 1);
													handlePageIndexChange((d.value - 1).toString());
												}
											}}
											disabled={
												(d.value === 1 && Number(currentPage) === 0) ||
												d.value - 1 === Number(currentPage)
											}
										>
											{d.label}
										</Button>
									</div>
								);
							})}
							<Button
								variant="outline"
								className="h-8 w-8 p-0 disabled:bg-[#E3E4EC]"
								onClick={() => {
									table.toggleAllPageRowsSelected(false);
									handlePageIndexChange((currentPage + 1).toString());
								}}
								disabled={currentPage === totalPage - 1}
							>
								<span className="sr-only">Go to next page</span>
								<ChevronRightIcon className="h-4 w-4 text-[#6C757D]" />
							</Button>
							<Button
								variant="outline"
								className="hidden h-8 w-8 p-0 disabled:bg-[#E3E4EC] lg:flex"
								onClick={() => {
									table.toggleAllPageRowsSelected(false);
									handlePageIndexChange((totalPage - 1).toString());
								}}
								disabled={currentPage === totalPage - 1}
							>
								<span className="sr-only">Go to last page</span>
								<ChevronsRightIcon className="h-4 w-4 text-[#6C757D]" />
							</Button>
						</div>
					</div>
				</div>
			)}
			{table.getFilteredSelectedRowModel().rows.length > 0 && (
				<div
					className={cn(
						"absolute bottom-0 left-0 z-40 flex w-full justify-center bg-white/80 pt-2",
					)}
				>
					<div className="flex items-center gap-4 bg-primary/10 px-4 py-1">
						<p className="text-nowrap text-primary text-sm">
							{table.getFilteredSelectedRowModel().rows.length}
							件の顧問先が選択されています
						</p>
						{toastContent?.(table)}
						<button
							type="button"
							onClick={() => {
								table.toggleAllPageRowsSelected(false);
							}}
							className="cursor-pointer"
						>
							<XIcon className="h-4 w-4 text-[#6C757D]" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomTable;
