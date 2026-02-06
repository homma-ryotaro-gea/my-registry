import type React from "react";

type ComponentWrapperProps = {
	children: React.ReactNode;
	title: string;
	description?: string;
};

const ComponentWrapper = ({
	children,
	title,
	description,
}: ComponentWrapperProps) => {
	return (
		<div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative w-full ">
			<div>
				<h2 className="text-sm text-muted-foreground ">{title}</h2>
				{description && (
					<p className="text-sm text-muted-foreground">{description}</p>
				)}
			</div>
			<div className="flex items-center justify-center min-h-[400px] relative">
				{children}
			</div>
		</div>
	);
};

export default ComponentWrapper;
