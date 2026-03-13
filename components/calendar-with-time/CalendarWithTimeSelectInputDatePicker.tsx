"use client";

import dayjs from "dayjs";
import { useState } from "react";
import CalendarWithTimeSelectInput from "@/registry/br-hr/blocks/calendar-with-time-select-input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const CalendarWithTimeSelectInputDatePicker = () => {
	const [dateTime, setDateTime] = useState<Date>(dayjs().toDate());

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline">日時を選択（TimeSelect版）</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[400px] border-none bg-transparent shadow-none p-0">
						<CalendarWithTimeSelectInput date={dateTime} onSelect={setDateTime} />
					</PopoverContent>
				</Popover>
			</div>
			<p>選択している日時: {dayjs(dateTime).format("YYYY年MM月DD日 HH:mm")}</p>
		</div>
	);
};

export default CalendarWithTimeSelectInputDatePicker;

