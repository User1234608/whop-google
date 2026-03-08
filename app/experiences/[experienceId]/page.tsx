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
  const companyId = experience.company;

  const redis = new Redis({
    url: process.env.storage_KV_REST_API_URL!,
    token: process.env.storage_KV_REST_API_TOKEN!,
  });

  const googleDocUrl = (await redis.get<string>(`doc:${companyId}`)) ?? "";

  return (
    <div className="p-4 text-sm">
      <p>experienceId: {experienceId}</p>
      <p>companyId: {companyId}</p>
      <p>googleDocUrl: {googleDocUrl || "not found"}</p>
    </div>
  );
}