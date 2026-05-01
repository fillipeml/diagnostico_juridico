import { describe, it, expect } from "vitest";

// Simulates the logout behavior: clearing the session cookie
function createLogoutResponse(): Response {
  const response = new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie":
        "session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    },
  });
  return response;
}

describe("Auth — logout", () => {
  it("clears the session cookie on logout", () => {
    const response = createLogoutResponse();
    const cookie = response.headers.get("Set-Cookie");

    expect(cookie).toBeTruthy();
    expect(cookie).toContain("session=");
    expect(cookie).toContain("Max-Age=0");
    expect(cookie).toContain("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
  });

  it("returns 200 on successful logout", () => {
    const response = createLogoutResponse();
    expect(response.status).toBe(200);
  });
});
