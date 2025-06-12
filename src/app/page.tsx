"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import RepoCard from "@/components/RepoCard";
import FrequencySelector, { Frequency } from "@/components/FrequencySelector";
import type { Repo } from "@/components/types";
import useSearch from "@/hooks/useSearch";

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [customDate, setCustomDate] = useState("");
  const { query, setQuery, filtered } = useSearch(repos);

  const getDate = useCallback((): string => {
    const now = new Date();
    switch (frequency) {
      case "daily":
        now.setDate(now.getDate() - 1);
        return now.toISOString().split("T")[0];
      case "weekly":
        now.setDate(now.getDate() - 7);
        return now.toISOString().split("T")[0];
      case "monthly":
        now.setMonth(now.getMonth() - 1);
        return now.toISOString().split("T")[0];
      case "custom":
        return customDate;
      default:
        return "";
    }
  }, [frequency, customDate]);

  const loadRepos = useCallback(async () => {
    const date = getDate();
    if (!date) {
      setRepos([]);
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=15`
      );
      const data = await res.json();
      setRepos(data.items || []);
    } catch (err) {
      console.error("Failed to fetch repositories", err);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, [getDate]);

  useEffect(() => {
    loadRepos();
  }, [loadRepos]);

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 m-0">Trending Repositories</h1>
        <div className="d-flex">
          <FrequencySelector
            value={frequency}
            customDate={customDate}
            onChange={setFrequency}
            onCustomDateChange={setCustomDate}
          />
          <Button
            variant="dark"
            onClick={loadRepos}
            disabled={loading}
            className="ms-2"
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>
      </div>

      <Row className="mb-3">
        <Col>
          <Form.Control
            type="search"
            placeholder="Search repositories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
      </Row>

      {/* Use card group so all cards share equal height */}
      <Row xs={1} md={2} lg={3} className="g-4 card-group">
        {filtered.map((repo) => (
          <Col key={repo.id}>
            <RepoCard repo={repo} />
          </Col>
        ))}
      </Row>
    </main>
  );
}
