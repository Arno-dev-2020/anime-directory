# Testing Documentation

## 1. Unit Testing

### Tools

- **Jest**: JavaScript testing framework.
- **React Testing Library**: For testing React components.

### What to Test

- Individual components (e.g., `AnimeCard`, `Navbar`).
- Utility functions (e.g., data formatting, API response handling).

### Example Test

```javascript
import { render, screen } from "@testing-library/react";
import AnimeCard from "./AnimeCard";

test("renders anime title", () => {
  render(<AnimeCard title="Naruto" image="naruto.jpg" />);
  const titleElement = screen.getByText(/Naruto/i);
  expect(titleElement).toBeInTheDocument();
});
```
