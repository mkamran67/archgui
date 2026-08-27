import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("catalog home page", () => {
  it("renders the mock catalog and filters apps by search", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /the gui apps/i })).toBeInTheDocument();
    expect(screen.getByText("Pamac")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "battery" } });

    expect(screen.getByText("TLPUI")).toBeInTheDocument();
    expect(screen.queryByText("Pamac")).not.toBeInTheDocument();
  });

  it("filters cards by category and can clear an empty result", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole("button", { name: "Recovery" }));
    expect(screen.getByText("Timeshift")).toBeInTheDocument();
    expect(screen.queryByText("Stacer")).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "no-such-app" } });
    fireEvent.click(screen.getByRole("button", { name: /clear filters/i }));
    expect(screen.getByText("Pamac")).toBeInTheDocument();
  });
});
