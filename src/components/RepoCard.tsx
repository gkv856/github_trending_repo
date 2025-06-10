import { Card } from "react-bootstrap";
import type { Repo } from "./types";

interface RepoCardProps {
  repo: Repo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
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
  );
}
