export default async function ExperiencePage() {
  const googleDocUrl = process.env.GOOGLE_DOC_URL ?? "";

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