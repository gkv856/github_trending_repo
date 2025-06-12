import { useState, useMemo } from "react";
import type { Repo } from "@/components/types";

export default function useRepoSearch(repos: Repo[]) {
  const [query, setQuery] = useState("");

  const filteredRepos = useMemo(() => {
    if (!query.trim()) {
      return repos;
    }
    const lower = query.toLowerCase();
    return repos.filter((repo) => {
      return (
        repo.name.toLowerCase().includes(lower) ||
        repo.owner.login.toLowerCase().includes(lower) ||
        (repo.description ?? "").toLowerCase().includes(lower)
      );
    });
  }, [repos, query]);

  return { query, setQuery, filteredRepos };
}
