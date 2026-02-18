/*
 * ページネーションの表示数を取得する
 */
export const getDispPage = (currentPage: number, totalPage?: number) => {
	const displayPages = [];
	const items: {
		label: string | number;
		value: number;
	}[] = [];

	for (let i = 1; i <= (totalPage ?? 0); i++) {
		if (
			i === 1 ||
			i === totalPage ||
			(i >= currentPage - 2 && i <= currentPage + 2)
		) {
			displayPages.push(i);
		}
	}

	let previousPage = 0;
	for (const page of displayPages) {
		if (previousPage) {
			if (page - previousPage === 2) {
				items.push({ label: previousPage + 1, value: previousPage + 1 });
			} else if (page - previousPage > 2) {
				items.push({ label: "...", value: previousPage + 1 });
			}
		}
		items.push({ label: page, value: page });
		previousPage = page;
	}

	return items;
};
