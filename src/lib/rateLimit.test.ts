import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rateLimit";

describe("createRateLimiter", () => {
  it("bloqueia após o limite e libera quando a janela acaba", () => {
    let t = 0;
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000, now: () => t });

    expect(limiter.check("ip").allowed).toBe(true);
    expect(limiter.check("ip").allowed).toBe(true);
    t = 400;
    expect(limiter.check("ip")).toEqual({ allowed: false, retryAfterSeconds: 1 });

    t = 1000;
    expect(limiter.check("ip").allowed).toBe(true);
  });

  it("conta cada chave separadamente", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, now: () => 0 });
    expect(limiter.check("a").allowed).toBe(true);
    expect(limiter.check("b").allowed).toBe(true);
    expect(limiter.check("a").allowed).toBe(false);
  });
});
