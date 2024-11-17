import SearchBar from "./SearchBar";
import { Anime, SearchResponse } from "@/types/search";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchText = await searchParams.then((params) => params.q);
  const kodikToken = process.env.KODIK_TOKEN;

  const res = await fetch(
    `https://kodikapi.com/search?token=${kodikToken}&title=${searchText}&limit=25&types=anime,anime-serial&has_field=shikimori_id`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const searchRes: SearchResponse = await res.json();
  const animes = searchRes.results;

  const uniqueAnimes = Array.from(
    animes
      .reduce((map, anime) => {
        if (!map.has(anime.shikimori_id)) {
          map.set(anime.shikimori_id, anime);
        }
        return map;
      }, new Map<number, Anime>())
      .values()
  );

  return (
    <div className="max-w-3xl mx-auto pt-20 px-4">
      <SearchBar suggestions={uniqueAnimes} />
    </div>
  );
}
