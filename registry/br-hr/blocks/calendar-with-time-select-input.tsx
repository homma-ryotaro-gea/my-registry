"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { Matcher, OnSelectHandler } from "react-day-picker";
import TimeSelectInput from "@/registry/br-hr/blocks/time-select-input";
import { Calendar } from "@/registry/br-hr/ui/calendar";
import { Card, CardContent } from "@/registry/br-hr/ui/card";

type CalendarWithTimeSelectInputProps = {
	date: Date | undefined;
	onSelect: (date: Date) => void;
	disabledDates?: Matcher[];
	timeChangeWhenDateUndefinedMode?: "ignore" | "today";
};

const CalendarWithTimeSelectInput = ({
	date,
	onSelect,
	disabledDates,
	timeChangeWhenDateUndefinedMode = "ignore",
}: CalendarWithTimeSelectInputProps) => {
	const [timeValue, setTimeValue] = useState<string>(
		date != null ? dayjs(date).format("HH:mm") : "",
	);

	// 親の date が変わったときに timeValue も同期する
	useEffect(() => {
		if (date) {
			setTimeValue(dayjs(date).format("HH:mm"));
		} else {
			setTimeValue("");
		}
	}, [date]);

	const handleDaySelect: OnSelectHandler<Date> = (
		nextDate: Date | undefined,
	) => {
		if (!nextDate) return;
		// 既に時刻が入っていればそれを維持
		const base = date ?? nextDate;
		const merged = dayjs(nextDate)
			.hour(dayjs(base).hour())
			.minute(dayjs(base).minute())
			.second(0)
			.millisecond(0)
			.toDate();
		onSelect(merged);
	};

	const handleTimeChange = (value: string) => {
		// 入力欄の表示は常に更新して、ユーザーが自由に入力できるようにする
		setTimeValue(value);

		// クリアボタンで空文字になった場合は、日時はそのままにして入力欄だけクリア
		if (!value) {
			return;
		}

		// 完全な HH:mm 形式になったタイミングでのみ Date を更新する
		if (!/^\d{2}:\d{2}$/.test(value)) {
			return;
		}

		const [hh, mm] = value.split(":").map((v) => Number(v));

		if (!date) {
			if (timeChangeWhenDateUndefinedMode === "today") {
				const base = dayjs().hour(hh).minute(mm).second(0).millisecond(0);
				onSelect(base.toDate());
			}
			return;
		}

		const next = dayjs(date)
			.hour(hh)
			.minute(mm)
			.second(0)
			.millisecond(0)
			.toDate();
		onSelect(next);
	};

	return (
		<div>
			<Card className="gap-0 overflow-hidden p-2">
				<CardContent>
					<div className="p-6">
						<Calendar
							mode="single"
							selected={date}
							onSelect={handleDaySelect}
							required={true}
							defaultMonth={date}
							disabled={disabledDates}
							showOutsideDays={false}
							className="bg-transparent p-0 [--cell-size:--spacing(10)]"
						/>
					</div>
					<div className="flex justify-center items-center pb-2">
						<TimeSelectInput
							value={timeValue}
							onChange={handleTimeChange}
							className="text-center"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default CalendarWithTimeSelectInput;
