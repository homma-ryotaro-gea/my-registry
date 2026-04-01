/** 労働条件通知書PDF用の行データ */
export type PdfRowType = {
	id?: string;
	label: string;
	value: string;
};

export type PdfDataType = {
	/** 文書タイトル（例: 労働条件通知書） */
	title: string;
	/** ラベル・値の行 */
	rows: PdfRowType[];
};
