"use client";

import dayjs from "dayjs";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import type { Matcher, OnSelectHandler } from "react-day-picker";
import { Calendar } from "@/registry/br-hr/ui/calendar";
import { Card, CardContent } from "@/registry/br-hr/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/br-hr/ui/select";

type CalendarWithTimeProps = {
	date: Date | undefined;
	onSelect: (date: Date) => void;
	disabledDates?: Matcher[];
	minHour?: number;
	maxHour?: number;
	minMinute?: number;
	maxMinute?: number;
};

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
	value: String(i),
	label: String(i).padStart(2, "0"),
}));
const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => ({
	value: String(i),
	label: String(i).padStart(2, "0"),
}));

const CalendarWithTime = ({
	date,
	disabledDates,
	onSelect,
	minHour,
	maxHour,
	minMinute,
	maxMinute,
}: CalendarWithTimeProps) => {
	const [selectedHour, setSelectedHour] = useState<string | undefined>(
		undefined,
	);
	const [selectedMinute, setSelectedMinute] = useState<string | undefined>(
		undefined,
	);

	const onDayClick: OnSelectHandler<Date> = (date: Date) => {
		onSelect(date);
	};
	const onHourChange = (value: string) => {
		// 日と分はそのままで時だけを変更
		const current = dayjs(date)
			.hour(Number(value))
			.minute(selectedMinute ? Number(selectedMinute) : (minMinute ?? 0));
		const next = current.toDate();
		onSelect(next);
		setSelectedHour(value);
	};
	const onMinuteChange = (value: string) => {
		const current = dayjs(date)
			.hour(selectedHour ? Number(selectedHour) : (minHour ?? 0))
			.minute(Number(value));
		const next = current.toDate();
		onSelect(next);
		setSelectedMinute(value);
	};

	useEffect(() => {
		if (minHour !== undefined && dayjs(date).hour() < minHour) {
			return;
		}
		// 時間が最大値を超えていたら選択しない
		if (maxHour !== undefined && dayjs(date).hour() > maxHour) {
			return;
		}
		// 分が最小値を超えていたら選択しない
		if (minMinute !== undefined && dayjs(date).minute() < minMinute) {
			return;
		}
		if (maxMinute !== undefined && dayjs(date).minute() > maxMinute) {
			return;
		}
		setSelectedHour(String(dayjs(date).hour()));
		setSelectedMinute(String(dayjs(date).minute()));
	}, [date, minHour, maxHour, minMinute, maxMinute]);

	return (
		<div>
			<Card className="gap-0 overflow-hidden p-2">
				<CardContent className="">
					<div className="p-6">
						<Calendar
							mode="single"
							selected={date}
							onSelect={onDayClick}
							required={true}
							defaultMonth={date}
							disabled={disabledDates}
							showOutsideDays={false}
							className="bg-transparent p-0 [--cell-size:--spacing(10)]"
						/>
					</div>
					<div className="flex justify-center items-center gap-2">
						<Timer className="size-4 text-muted-foreground" />
						<div className="flex items-center gap-1">
							<Select value={selectedHour} onValueChange={onHourChange}>
								<SelectTrigger className="flex-1 max-w-20">
									<SelectValue placeholder="時" />
								</SelectTrigger>
								<SelectContent className="h-80 min-w-20" position="popper">
									{HOUR_OPTIONS.map(({ value, label }) => (
										<SelectItem
											key={value}
											value={value}
											disabled={
												(minHour !== undefined && Number(value) < minHour) ||
												(maxHour !== undefined && Number(value) > maxHour)
											}
										>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<span className="shrink-0 text-muted-foreground">時</span>
							<span className="shrink-0 text-muted-foreground">:</span>
							<Select value={selectedMinute} onValueChange={onMinuteChange}>
								<SelectTrigger className="flex-1 max-w-20">
									<SelectValue placeholder="分" />
								</SelectTrigger>
								<SelectContent className="h-80 min-w-20" position="popper">
									{MINUTE_OPTIONS.map(({ value, label }) => (
										<SelectItem
											key={value}
											value={value}
											disabled={
												(minMinute !== undefined &&
													Number(value) < minMinute) ||
												(maxMinute !== undefined && Number(value) > maxMinute)
											}
										>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<span className="shrink-0 text-muted-foreground">分</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default CalendarWithTime;
