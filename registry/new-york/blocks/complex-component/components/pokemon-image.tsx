"use client";

import Image from "next/image";
import { usePokemonImage } from "@/registry/new-york/blocks/complex-component/hooks/use-pokemon";

export function PokemonImage({
	name,
	number,
}: {
	name: string;
	number: number;
}) {
	const imageUrl = usePokemonImage(number);

	if (!imageUrl) {
		return null;
	}

	return <Image src={imageUrl} alt={name} width={100} height={100} />;
}
