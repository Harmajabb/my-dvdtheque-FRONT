import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import App from "../App";

// jest-axe ajoute des matchers, mais avec Vitest + TS on peut rester simple
// en vérifiant qu'il n'y a pas de violations.
describe("Accessibility", () => {
  it("App has no a11y violations", async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
