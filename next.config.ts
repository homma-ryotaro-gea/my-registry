import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	cacheLife: {
		infinite: {
			stale: Number.MAX_VALUE,
			revalidate: Number.MAX_VALUE,
			expire: Number.MAX_VALUE,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
