export default async function DashboardPage() {
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Google Docs Embed</h1>
      <p className="text-gray-500">
        To change the displayed document, update the{" "}
        <code className="bg-gray-100 px-1 rounded">GOOGLE_DOC_URL</code>{" "}
        environment variable in your Vercel dashboard.
      </p>
    </div>
  );
}