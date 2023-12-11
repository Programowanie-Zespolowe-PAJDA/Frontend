import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Dummy from "./Dummy";

describe("Dummy Component", () => {
    it("renders test if not clicked", () => {
        // Arrange
        render(<Dummy />);

        // Assert
        const testElement = screen.queryByText(/test/i);
        const tsetElement = screen.queryByText(/tset/i);
        expect(testElement).toBeInTheDocument();
        expect(tsetElement).not.toBeInTheDocument();
    });

    it("renders tset if clicked", async () => {
        // Arrange
        render(<Dummy />);

        // Act
        const buttonElement = screen.getByRole("button");
        await userEvent.click(buttonElement);

        // Assert
        const testElement = screen.queryByText(/test/i);
        const tsetElement = screen.queryByText(/tset/i);
        expect(testElement).not.toBeInTheDocument();
        expect(tsetElement).toBeInTheDocument();
    });
});
