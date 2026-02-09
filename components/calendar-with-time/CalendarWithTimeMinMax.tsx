"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CalendarWithTime from "@/registry/br-hr/blocks/calendar-with-time";

const CalendarWithTimeMinMax = () => {
	// 日付を親で管理する場合は state を渡す。省略するとコンポーネント内で管理（非制御）
	// 初期値は dayjs が確実にパースできる形式（YYYY-MM-DDTHH:mm）にする
	const [dateTime, setDateTime] = useState<Date | undefined>(undefined);
	console.log("dateTime", dateTime);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<CalendarWithTime
					date={dateTime}
					onSelect={setDateTime}
					minHour={0}
					maxHour={10}
					minMinute={0}
					maxMinute={10}
				/>
			</div>
			<p className={cn("whitespace-pre-wrap", !dateTime && "text-destructive")}>
				{dateTime
					? `選択している日時: ${dayjs(dateTime).format("YYYY年MM月DD日 HH:mm")}`
					: "日時が選択されていないか、最大・最小値を超えています"}
			</p>
		</div>
	);
};

export default CalendarWithTimeMinMax;
