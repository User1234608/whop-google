import { Redis } from "@upstash/redis";
import Whop from "@whop/sdk";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;

  const whop = new Whop({ apiKey: process.env.WHOP_API_KEY });
  const experience = await whop.experiences.retrieve(experienceId);
  const companyId = experience.company.id;

  const redis = new Redis({
    url: process.env.storage_KV_REST_API_URL!,
    token: process.env.storage_KV_REST_API_TOKEN!,
  });

  const googleDocUrl = (await redis.get<string>(`doc:${companyId}`)) ?? "";

  if (!googleDocUrl) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-lg">
        No document configured yet.
      </div>
    );
  }

  const embedUrl = googleDocUrl.replace(/\/edit.*$/, "/preview");

  return (
    <iframe
      src={embedUrl}
      className="w-full h-screen border-0"
      allow="autoplay"
    />
  );
}