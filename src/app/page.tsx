import type { Metadata } from "next";
import { LandingClient } from "@/components/LandingClient";
import {
  buildPageDescription,
  buildPageTitle,
  resolveStudioProfile,
} from "@/data/studio";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function getStudio(searchParams: SearchParams) {
  const params = await searchParams;
  return resolveStudioProfile({
    name: params.name,
    address: params.address,
    phone: params.phone,
  });
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const studio = await getStudio(searchParams);
  const title = buildPageTitle(studio.name);
  const description = buildPageDescription(studio.name);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: studio.name,
      locale: "pl_PL",
      type: "website",
    },
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const studio = await getStudio(searchParams);
  return <LandingClient studio={studio} />;
}
