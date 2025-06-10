import { Form } from "react-bootstrap";

export type Frequency = "daily" | "weekly" | "monthly" | "custom";

interface FrequencySelectorProps {
  value: Frequency;
  customDate?: string;
  onChange: (value: Frequency) => void;
  onCustomDateChange?: (value: string) => void;
}

export default function FrequencySelector({
  value,
  customDate,
  onChange,
  onCustomDateChange,
}: FrequencySelectorProps) {
  return (
    <Form.Group className="d-flex align-items-center">
      <Form.Select
        aria-label="Select frequency"
        value={value}
        onChange={(e) => onChange(e.target.value as Frequency)}
        className="me-2"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="custom">Custom</option>
      </Form.Select>
      {value === "custom" && onCustomDateChange && (
        <Form.Control
          type="date"
          value={customDate}
          onChange={(e) => onCustomDateChange(e.target.value)}
        />
      )}
    </Form.Group>
  );
}
