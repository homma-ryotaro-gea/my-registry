import {
	Document,
	Font,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import type { PdfDataType } from "./type";

Font.register({
	family: "Noto Serif JP",
	fonts: [
		{
			src: "/fonts/NotoSerifJP-Regular.ttf",
		},
		{
			src: "/fonts/NotoSerifJP-Bold.ttf",
			fontWeight: "bold",
		},
	],
});

Font.registerHyphenationCallback((word) =>
	Array.from(word).flatMap((char) => [char, ""]),
);

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontFamily: "Noto Serif JP",
		fontSize: 10,
		lineHeight: 1.45,
	},
	title: {
		fontSize: 18,
		fontWeight: 700,
		textAlign: "center",
		marginBottom: 24,
	},
	table: {
		width: "100%",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#000000",
	},
	row: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#000000",
		minHeight: 28,
		alignItems: "stretch",
	},
	rowLast: {
		flexDirection: "row",
		minHeight: 28,
		alignItems: "stretch",
	},
	cellLabel: {
		width: "28%",
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRightWidth: 1,
		borderRightColor: "#000000",
		justifyContent: "center",
	},
	cellValue: {
		flex: 1,
		paddingHorizontal: 8,
		paddingVertical: 6,
		justifyContent: "center",
	},
	labelText: {
		fontSize: 9,
	},
	valueText: {
		fontSize: 9,
	},
});

export type PropsType = {
	data: PdfDataType;
};

export const PdfContents = ({ data }: PropsType) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<Text style={styles.title}>{data.title}</Text>
			<View style={styles.table}>
				{data.rows.map((row, idx) => {
					const isLast = idx === data.rows.length - 1;
					return (
						<View
							key={`${row.label}-${idx}`}
							style={isLast ? styles.rowLast : styles.row}
							wrap={false}
						>
							<View style={styles.cellLabel}>
								<Text style={styles.labelText}>{row.label}</Text>
							</View>
							<View style={styles.cellValue}>
								<Text style={styles.valueText} wrap>
									{row.value}
								</Text>
							</View>
						</View>
					);
				})}
			</View>
		</Page>
	</Document>
);
