"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
} from "@/registry/br-hr/ui/popover";
import { ScrollArea } from "@/registry/br-hr/ui/scroll-area";
import { Input } from "@/registry/new-york/ui/input";

const PLACEHOLDER = "--:--";
const MAX_LENGTH = 5;

// 00:15 から 23:45 まで 15分刻み（00:00 は含めない）
function getTimeOptions(): string[] {
	const opts: string[] = [];
	for (let h = 0; h < 24; h++) {
		for (const m of [0, 15, 30, 45]) {
			if (h === 0 && m === 0) continue;
			opts.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
			if (h === 23 && m === 45) return opts;
		}
	}
	return opts;
}

const SELECT_OPTIONS = getTimeOptions();

function normalizeTime(s: string): string {
	const trimmed = s.trim();
	if (trimmed.length === 0) return "00:00";
	if (/[^0-9:]/.test(trimmed)) return "00:00";
	if (/^\d{2}:\d{2}$/.test(trimmed)) return trimmed;
	const digits = trimmed.replace(/:/g, "");
	if (digits.length >= 4) {
		const four = digits.slice(0, 4);
		return `${four.slice(0, 2)}:${four.slice(2, 4)}`;
	}
	const padded = digits.padStart(4, "0");
	return `${padded.slice(0, 2)}:${padded.slice(2, 4)}`;
}

type TimeSelectInputProps = {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	className?: string;
	disabled?: boolean;
};

const TimeSelectInput = ({
	value: controlledValue,
	defaultValue = "",
	onChange,
	className,
	disabled = false,
}: TimeSelectInputProps) => {
	const [open, setOpen] = useState(false);
	const [internalValue, setInternalValue] = useState(defaultValue);
	const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const didSelectFromDropdownRef = useRef(false);

	const isControlled = controlledValue !== undefined;
	const value = (isControlled ? controlledValue : internalValue) ?? "";

	const setValue = useCallback(
		(v: string) => {
			if (!isControlled) setInternalValue(v);
			onChange?.(v);
		},
		[isControlled, onChange],
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		const next = raw.length > MAX_LENGTH ? raw.slice(0, MAX_LENGTH) : raw;
		setValue(next);
	};

	const handleBlur = () => {
		blurTimeoutRef.current = setTimeout(() => {
			setOpen(false);
			// セレクトから選択した直後は正規化しない（選択した値が上書きされるのを防ぐ）
			if (didSelectFromDropdownRef.current) {
				didSelectFromDropdownRef.current = false;
				return;
			}
			// フォーカス後に入力がなければ何もしない
			if (!value.trim()) return;
			const normalized = normalizeTime(value);
			setValue(normalized);
		}, 150);
	};

	const handleFocus = () => {
		if (blurTimeoutRef.current) {
			clearTimeout(blurTimeoutRef.current);
			blurTimeoutRef.current = null;
		}
		setOpen(true);
	};

	const handleSelectOption = (option: string) => {
		didSelectFromDropdownRef.current = true;
		setValue(option);
		setOpen(false);
		wrapperRef.current?.querySelector("input")?.blur();
	};

	const handleClear = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setValue("");
	};

	useEffect(() => {
		return () => {
			if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
		};
	}, []);

	const displayValue = value;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverAnchor asChild>
				<div className="relative w-fit" ref={wrapperRef}>
					<Input
						type="text"
						inputMode="numeric"
						placeholder={PLACEHOLDER}
						value={displayValue}
						onChange={handleInputChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						disabled={disabled}
						maxLength={MAX_LENGTH}
						className={cn("w-[100px]", value.trim() && "pr-7", className)}
						aria-label="時間を入力（00:00形式）"
					/>
					{value.trim() ? (
						<button
							type="button"
							onClick={handleClear}
							onMouseDown={(e) => e.preventDefault()}
							disabled={disabled}
							className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
							aria-label="クリア"
						>
							<X className="size-3.5" />
						</button>
					) : null}
				</div>
			</PopoverAnchor>
			<PopoverContent
				className="w-[100px] p-0 overflow-hidden"
				align="start"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<ScrollArea className="h-60 overflow-hidden">
					<div className="p-1">
						{SELECT_OPTIONS.map((option) => (
							<button
								key={option}
								type="button"
								className={cn(
									"cursor-pointer flex w-full items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
									value === option && "bg-accent text-accent-foreground",
								)}
								onClick={() => handleSelectOption(option)}
								onMouseDown={(e) => e.preventDefault()}
							>
								{option}
							</button>
						))}
					</div>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
};

export default TimeSelectInput;
