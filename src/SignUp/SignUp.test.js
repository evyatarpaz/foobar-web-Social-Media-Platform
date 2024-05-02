import { passwordMatch, passwordStrength } from "../userService"
test("password and confirmPassword should match", () => {
    const password = "password123";
    const confirmPassword = "password123";

    expect(passwordMatch(password, confirmPassword)).toBe(true);
});

test("password and confirmPassword should not match", () => {
    const password = "password123";
    const confirmPassword = "password1234";

    expect(passwordMatch(password, confirmPassword)).toBe(false);
});

test("password should have at least 8 characters, 1 uppercase, 1 lowercase, and 1 number", () => {
    const password = "Password123";

    expect(passwordStrength(password)).toBe(true);
});         

test("password should not have at least 8 characters, 1 uppercase, 1 lowercase, and 1 number", () => {
    const password = "Password";

    expect(passwordStrength(password)).toBe(false);
});
