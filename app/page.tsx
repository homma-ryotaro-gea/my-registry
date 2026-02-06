import ComponentWrapper from "@/components/ComponentWrapper";
import CalendarWithTime from "@/components/calendar-with-time/CalendarWithTime";
import CalendarWithTimeDatePicker from "@/components/calendar-with-time/CalendarWithTimeDatePicker";
import CalendarWithTimeDisabled from "@/components/calendar-with-time/CalendarWithTimeDisabled";
import CalendarWithTimeMinMax from "@/components/calendar-with-time/CalendarWithTimeMinMax";

export default function Home() {
	return (
		<div className="flex flex-col min-h-svh px-4 py-8 gap-8">
			<header className="flex flex-col gap-1">
				<h1 className="text-3xl font-bold tracking-tight">
					BY_HR Component Library
				</h1>
			</header>
			<main>
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold tracking-tight">
						Calendar with Time
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
						<ComponentWrapper title="Default">
							<CalendarWithTime />
						</ComponentWrapper>
						<ComponentWrapper title="Date Picker">
							<CalendarWithTimeDatePicker />
						</ComponentWrapper>
						<ComponentWrapper title="Disabled">
							<CalendarWithTimeDisabled />
						</ComponentWrapper>
						<ComponentWrapper
							title="Min Max"
							description="時間は0時から12時、分は0分から30分に制限"
						>
							<CalendarWithTimeMinMax />
						</ComponentWrapper>
					</div>
				</div>
			</main>
		</div>
	);
}
