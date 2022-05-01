import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("password");
  const confirmPasswordInputElement = screen.getByLabelText("confirm password");

  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickOnSubmitButton = () => {
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
};

describe("App", () => {
  test("inputs should be initially empty", () => {
    const emailInputElement = screen.getByRole("textbox");
    expect(emailInputElement.value).toBe("");

    const passwordInputElement = screen.getByLabelText("password");
    expect(passwordInputElement.value).toBe("");

    const confirmPasswordInputElement =
      screen.getByLabelText("confirm password");
    expect(confirmPasswordInputElement.value).toBe("");
  });

  test("should be able to type an email", () => {
    const { emailInputElement } = typeIntoForm({ email: "manish@gmail.com" });
    expect(emailInputElement.value).toBe("manish@gmail.com");
  });

  test("should be able to type an password", () => {
    const { passwordInputElement } = typeIntoForm({ password: "12345" });
    expect(passwordInputElement.value).toBe("12345");
  });

  test("should be able to type an confirm password", () => {
    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: "12345",
    });
    expect(confirmPasswordInputElement.value).toBe("12345");
  });

  describe("error handling", () => {
    test("should show email error message on invalid email", () => {
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();
      typeIntoForm({ email: "manish" });
      clickOnSubmitButton();
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).toBeInTheDocument();
    });

    test("should show password error message on invalid password", () => {
      typeIntoForm({ email: "manish@gmail.com" });
      expect(
        screen.queryByText(/the password you input is invalid/i)
      ).not.toBeInTheDocument();
      typeIntoForm({ password: "123" });
      clickOnSubmitButton();
      expect(
        screen.queryByText(/the password you input is invalid/i)
      ).toBeInTheDocument();
    });

    test("should show confirm password if password dont match", () => {
      typeIntoForm({ email: "manish@gmail.com", password: "12345" });
      expect(
        screen.queryByText(/the passwords does not match. Try again/i)
      ).not.toBeInTheDocument();
      typeIntoForm({ confirmPassword: "123456" });
      clickOnSubmitButton();
      expect(
        screen.queryByText(/the passwords does not match. Try again/i)
      ).toBeInTheDocument();
    });

    test("should show no error if every input is valid", () => {
      typeIntoForm({
        email: "manish@gmail.com",
        password: "12345",
        confirmPassword: "12345",
      });
      clickOnSubmitButton();
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the password you input is invalid/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the passwords does not match. Try again/i)
      ).not.toBeInTheDocument();
    });
  });
});
