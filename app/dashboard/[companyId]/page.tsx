import { Redis } from "@upstash/redis";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  const redis = new Redis({
    url: process.env.storage_KV_REST_API_URL!,
    token: process.env.storage_KV_REST_API_TOKEN!,
  });

  const savedUrl = (await redis.get<string>(`doc:${companyId}`)) ?? "";

  async function saveDocUrl(formData: FormData) {
    "use server";
    const { companyId } = await params;
    const redis = new Redis({
      url: process.env.storage_KV_REST_API_URL!,
      token: process.env.storage_KV_REST_API_TOKEN!,
    });
    const url = formData.get("docUrl") as string;
    await redis.set(`doc:${companyId}`, url);
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Google Docs Embed Settings</h1>
      <p className="text-gray-500 mb-6">
        Paste your Google Doc share link below. Your members will see it embedded.
      </p>
      <form action={saveDocUrl} className="flex flex-col gap-4">
        <input
          name="docUrl"
          type="url"
          defaultValue={savedUrl}
          placeholder="https://docs.google.com/document/d/..."
          className="border rounded-lg px-4 py-2 w-full text-sm"
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg w-fit"
        >
          Save
        </button>
      </form>
      {savedUrl && (
        <p className="mt-4 text-sm text-green-600">Document is set</p>
      )}
    </div>
  );
}