import { kv } from "@vercel/kv";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;

  // Use experienceId as the key directly
  const googleDocUrl = await kv.get<string>(`doc:${experienceId}`) ?? 
                       await kv.get<string>("doc:default") ?? "";

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