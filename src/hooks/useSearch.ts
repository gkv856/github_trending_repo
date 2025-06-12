import { useState, useMemo } from "react";
import type { Repo } from "@/components/types";

export default function useSearch(repos: Repo[]) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return repos;
    const lower = query.toLowerCase();
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(lower) ||
        r.description?.toLowerCase().includes(lower)
    );
  }, [query, repos]);

  return { query, setQuery, filtered };
}
