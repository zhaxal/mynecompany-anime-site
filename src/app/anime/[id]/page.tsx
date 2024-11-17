import { SearchResponse } from "@/types/search";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kodikToken = process.env.KODIK_TOKEN;

  const res = await fetch(
    `https://kodikapi.com/search?token=${kodikToken}&shikimori_id=${id}&limit=1&types=anime,anime-serial&with_material_data=true`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const searchRes: SearchResponse = await res.json();
  const anime = searchRes.results[0];

  if (!anime) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>

      <div className="relative w-full pt-[56.25%] mb-8">
        <iframe
          id="kodik-player"
          src={anime.link}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          frameBorder="0"
          allowFullScreen
          allow="autoplay *; fullscreen *"
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {anime.title}
        </h1>

        {anime.material_data && (
          <>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {anime.material_data.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Year: {anime.year}</span>
              <span>Status: {anime.material_data.anime_status}</span>
              <span>Episodes: {anime.material_data.episodes_total}</span>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
