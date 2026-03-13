"use client";

import dayjs from "dayjs";
import { useState } from "react";
import CalendarWithTimeSelectInputBlock from "@/registry/br-hr/blocks/calendar-with-time-select-input";

const CalendarWithTimeSelectInput = () => {
	const [dateTime, setDateTime] = useState<Date>(dayjs().toDate());

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<CalendarWithTimeSelectInputBlock date={dateTime} onSelect={setDateTime} />
			</div>
			<p>選択している日時: {dayjs(dateTime).format("YYYY年MM月DD日 HH:mm")}</p>
		</div>
	);
};

export default CalendarWithTimeSelectInput;

