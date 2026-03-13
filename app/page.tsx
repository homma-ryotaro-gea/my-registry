import { Suspense } from "react";
import ComponentWrapper from "@/components/ComponentWrapper";
import CalendarWithTime from "@/components/calendar-with-time/CalendarWithTime";
import CalendarWithTimeClear from "@/components/calendar-with-time/CalendarWithTimeClear";
import CalendarWithTimeDatePicker from "@/components/calendar-with-time/CalendarWithTimeDatePicker";
import CalendarWithTimeDisabled from "@/components/calendar-with-time/CalendarWithTimeDisabled";
import CalendarWithTimeMinMax from "@/components/calendar-with-time/CalendarWithTimeMinMax";
import CalendarWithTimeSelectInput from "@/components/calendar-with-time/CalendarWithTimeSelectInput";
import CalendarWithTimeSelectInputDatePicker from "@/components/calendar-with-time/CalendarWithTimeSelectInputDatePicker";
import Codes from "@/components/codes/Codes";
import CodesCLI from "@/components/codes/CodesCLI";
import CodesMultiple from "@/components/codes/CodesMultiple";
import TimeSelectInput from "@/components/time-select-input/TimeSelectInput";

export default function Home() {
	return (
		<div className="flex flex-col min-h-svh px-4 py-8 gap-8">
			<header className="flex flex-col gap-1">
				<h1 className="text-3xl font-bold tracking-tight">
					BY_HR Component Library
				</h1>
			</header>
			<main className="space-y-8">
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold tracking-tight sticky top-0 bg-background z-10 py-2">
						Calendar with Time
					</h2>
					<Suspense
						fallback={
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
								読み込み中...
							</div>
						}
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
							<ComponentWrapper title="Default" name="calendar-with-time">
								<CalendarWithTime />
							</ComponentWrapper>
							<ComponentWrapper
								title="Date Picker"
								name="calendar-with-time-date-picker"
							>
								<CalendarWithTimeDatePicker />
							</ComponentWrapper>
							<ComponentWrapper
								title="Disabled"
								name="calendar-with-time-disabled"
							>
								<CalendarWithTimeDisabled />
							</ComponentWrapper>
							<ComponentWrapper
								title="Min Max"
								name="calendar-with-time-min-max"
								description="時間は0時から12時、分は0分から30分に制限"
							>
								<CalendarWithTimeMinMax />
							</ComponentWrapper>
							<ComponentWrapper
								title="Clear Button"
								name="calendar-with-time-clear"
							>
								<CalendarWithTimeClear />
							</ComponentWrapper>
							<ComponentWrapper
								title="Time Select Input Version"
								name="calendar-with-time-select-input"
							>
								<CalendarWithTimeSelectInput />
							</ComponentWrapper>
							<ComponentWrapper
								title="Time Select Input Date Picker"
								name="calendar-with-time-select-input-date-picker"
							>
								<CalendarWithTimeSelectInputDatePicker />
							</ComponentWrapper>
						</div>
					</Suspense>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold tracking-tight sticky top-0 bg-background z-10 py-2">
						Time Select Input
					</h2>
					<Suspense
						fallback={
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
								読み込み中...
							</div>
						}
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
							<ComponentWrapper title="Default" name="time-select-input">
								<TimeSelectInput />
							</ComponentWrapper>
						</div>
					</Suspense>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold tracking-tight sticky top-0 bg-background z-10 py-2">
						Codes
					</h2>
					<Suspense
						fallback={
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
								読み込み中...
							</div>
						}
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
							<ComponentWrapper title="Default" name="codes">
								<Codes />
							</ComponentWrapper>
							<ComponentWrapper title="Multiple" name="codes-multiple">
								<CodesMultiple />
							</ComponentWrapper>
							<ComponentWrapper title="CLI" name="codes-cli">
								<CodesCLI name="demo" />
							</ComponentWrapper>
						</div>
					</Suspense>
				</div>
			</main>
		</div>
	);
}
