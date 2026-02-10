"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CalendarWithTime from "./calendar-with-time";

const CalendarWithTimeClear = () => {
	// 日付を親で管理する場合は state を渡す。省略するとコンポーネント内で管理（非制御）
	// 初期値は dayjs が確実にパースできる形式（YYYY-MM-DDTHH:mm）にする
	const [dateTime, setDateTime] = useState<Date | undefined>(dayjs().toDate());
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<CalendarWithTime
					date={dateTime}
					onSelect={setDateTime}
					clearButton={true}
					onClear={() => {
						setDateTime(undefined);
					}}
				/>
			</div>
			<p className={cn("whitespace-pre-wrap", !dateTime && "text-destructive")}>
				{dateTime
					? `選択している日時: ${dayjs(dateTime).format("YYYY年MM月DD日 HH:mm")}`
					: "日時が選択されていません"}
			</p>
		</div>
	);
};

export default CalendarWithTimeClear;
