import { useMemo, useState } from "react";
import type { Repo } from "@/components/types";

export default function useRepoSearch(repos: Repo[]) {
  const [query, setQuery] = useState("");

  const filteredRepos = useMemo(() => {
    if (!query) return repos;
    const lower = query.toLowerCase();
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(lower) ||
        r.owner.login.toLowerCase().includes(lower)
    );
  }, [query, repos]);

  return { query, setQuery, filteredRepos };
}
