"use client";

import dynamic from "next/dynamic";
import config from "../../../../sanity.config";

const NextStudioNoSSR = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false, loading: () => <p style={{ padding: 48 }}>Loading CMS Studio…</p> },
);

export default function Studio() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <NextStudioNoSSR config={config as any} />;
}
