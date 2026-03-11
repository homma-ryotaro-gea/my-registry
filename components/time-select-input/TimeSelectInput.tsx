"use client";

import { useState } from "react";
import TimeSelectInputBlock from "@/registry/br-hr/blocks/time-select-input";

const TimeSelectInput = () => {
	const [time, setTime] = useState("");
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<TimeSelectInputBlock value={time} onChange={setTime} />
			</div>
			<p className="text-sm text-muted-foreground">
				選択している時間: {time || "未選択"}
			</p>
		</div>
	);
};

export default TimeSelectInput;
