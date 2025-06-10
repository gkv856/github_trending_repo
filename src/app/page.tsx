"use client";

import { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

// Shape of repository data returned by GitHub
interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  owner: { login: string };
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch repositories created in the last week sorted by stars
  const loadRepos = async () => {
    setLoading(true);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const date = lastWeek.toISOString().split("T")[0];

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
  };

  // Load repos on first render
  useEffect(() => {
    loadRepos();
  }, []);

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 m-0">Trending Repositories</h1>
        {/* Dark button to re-fetch data */}
        <Button variant="dark" onClick={loadRepos} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      {/* Use card group so all cards share equal height */}
      <Row xs={1} md={2} lg={3} className="g-4 card-group">
        {repos.map((repo) => (
          <Col key={repo.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {repo.owner.login}
                </Card.Subtitle>
                <Card.Text>{repo.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-body-secondary">
                  <i className="bi bi-star-fill me-1"></i>
                  {repo.stargazers_count}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </main>
  );
}
