"use client";
import dayjs from "dayjs";
import { useState } from "react";
import CalendarWithTimeComponent from "@/registry/br-hr/blocks/calendar-with-time";

const CalendarWithTime = () => {
	// 日付を親で管理する場合は state を渡す。省略するとコンポーネント内で管理（非制御）
	// 初期値は dayjs が確実にパースできる形式（YYYY-MM-DDTHH:mm）にする
	const [dateTime, setDateTime] = useState<Date>(dayjs().toDate());
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<CalendarWithTimeComponent date={dateTime} onSelect={setDateTime} />
			</div>
			<p>選択している日時: {dayjs(dateTime).format("YYYY年MM月DD日 HH:mm")}</p>
		</div>
	);
};

export default CalendarWithTime;
