"use client";
// import { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";

// my signature color is oklch (56.28% 0.213 26.25)
const TopLoader = () => {
  return (
    <NextTopLoader
      color="oklch(56.28% 0.213 26.25)"
      initialPosition={0.08}
      crawlSpeed={200}
      height={2}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      // shadow={`0 0 4px ${}`}
    />
  );
};

export default TopLoader;
