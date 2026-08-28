import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("catalog home page", () => {
  it("renders the mock catalog and filters apps by search", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /find the right gui/i })).toBeInTheDocument();
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

  it("orders apps by their numeric star count and announces the result count", () => {
    render(<HomePage />);

    const cards = screen.getAllByTestId("app-card");

    expect(cards[0]).toHaveAccessibleName(/stacer/i);
    expect(screen.getByRole("status")).toHaveTextContent("8 apps found");
  });

  it("labels missing popularity data without implying an app is new", () => {
    render(<HomePage />);

    const discover = screen.getAllByTestId("app-card").find((card) => within(card).queryByText("Discover"));

    expect(discover).toBeDefined();
    expect(within(discover!).getByText("Not listed")).toBeInTheDocument();
    expect(within(discover!).queryByText("New")).not.toBeInTheDocument();
  });

  it("filters the directory by distribution", () => {
    render(<HomePage />);

    fireEvent.change(screen.getByRole("combobox", { name: /distribution/i }), {
      target: { value: "Garuda" },
    });

    expect(screen.getByRole("status")).toHaveTextContent("3 apps found");
    expect(screen.getByText("Pamac")).toBeInTheDocument();
    expect(screen.getByText("Timeshift")).toBeInTheDocument();
    expect(screen.queryByText("Octopi")).not.toBeInTheDocument();
  });

  it("keeps technical details out of the initial scan and reveals them on demand", () => {
    render(<HomePage />);

    const detailsButton = screen.getByRole("button", { name: "Show Pamac details" });

    expect(detailsButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Unified pacman + AUR + Flatpak + Snap search")).not.toBeInTheDocument();

    fireEvent.click(detailsButton);

    expect(detailsButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Unified pacman + AUR + Flatpak + Snap search")).toBeInTheDocument();
  });

  it("compares a short list in an inline workspace", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole("button", { name: "Add Pamac to comparison" }));
    fireEvent.click(screen.getByRole("button", { name: "Add Stacer to comparison" }));
    fireEvent.click(screen.getByRole("button", { name: "Compare 2 apps" }));

    expect(screen.getByRole("region", { name: "Pamac vs Stacer" })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /category package manager system/i })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /popularity 580 stars 9,100 stars/i })).toBeInTheDocument();
  });
});
