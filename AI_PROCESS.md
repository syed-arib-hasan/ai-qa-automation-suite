# AI-Assisted Test Generation Process

## Overview

This project demonstrates an AI-assisted QA automation workflow where Claude Code
is used to generate, execute, and validate Playwright test scripts. All
AI-generated code was carefully reviewed, debugged, and verified by a human
before being committed to the repository.

---

## AI Tool Used

- **Tool:** Claude Code
- **Version:** 2.1.190
- **Purpose:** Test script generation, execution, and debugging

---

## Prompt Used to Generate Tests

The following prompt was given to Claude Code to generate the Playwright test suite:

> *"Create a Playwright test file called tests/saucedemo.spec.js that tests the
> SauceDemo website (https://www.saucedemo.com). Use JavaScript. Cover these
> scenarios:*
>
> 1. *Successful login with username "standard_user" and password "secret_sauce"*
> 2. *Failed login with wrong password - verify error message appears*
> 3. *Add "Sauce Labs Backpack" to cart and verify badge shows "1"*
> 4. *Remove item from cart and verify cart is empty*
> 5. *Complete full checkout flow with first name "John", last name "Doe", postal
>    code "12345" and verify "Thank you for your order!" appears*
>
> *After creating the file, run the tests on Chromium only and show me the results."*

---

## What Claude Code Generated

Claude Code created `tests/saucedemo.spec.js` containing:

- 5 test cases organized into 2 describe blocks (Login and Cart)
- A `beforeEach` hook for shared login logic across cart tests
- Stable `data-test` attribute selectors for reliable element targeting
- Proper `async/await` patterns and Playwright assertions throughout

---

## Test Results

All 5 tests passed on Chromium in 4.9 seconds:

| # | Test Name                                         | Result  | Time |
| - | ------------------------------------------------- | ------- | ---- |
| 1 | Successful login with standard_user               | ✅ Pass | 3.9s |
| 2 | Failed login with wrong password shows error      | ✅ Pass | 4.0s |
| 3 | Add Sauce Labs Backpack → badge shows "1"        | ✅ Pass | 4.1s |
| 4 | Remove item from cart → cart empty               | ✅ Pass | 4.1s |
| 5 | Full checkout flow → "Thank you for your order!" | ✅ Pass | 4.3s |

---

## Human Review Process

After Claude Code generated the test file, the following manual review steps
were performed before committing:

1. **Selector review** — verified all `data-test` attributes match the actual
   SauceDemo HTML elements
2. **Assertion review** — confirmed each `expect()` statement tests the correct
   condition and failure message
3. **Flow logic review** — traced through each test scenario manually to confirm
   the steps match real user behavior
4. **Edge case check** — verified the invalid login test uses a wrong password
   (not wrong username) to match the expected error message
5. **Execution verification** — ran the full suite locally before pushing to
   confirm 5/5 passing independently

---

## Key Learnings from Reviewing AI-Generated Code

- **`data-test` attributes are the most stable selectors** — they don't change
  when CSS classes or layout changes, making tests less brittle
- **`beforeEach` hooks** eliminate repeated login code across tests in the same
  describe block, keeping tests clean and maintainable
- **Parallel execution** — Playwright runs tests across workers by default,
  which is why 5 tests completed in under 5 seconds total
- **`async/await` throughout** — every browser interaction must be awaited,
  otherwise the test moves on before the action completes

---

## Why AI-Assisted Testing

Using Claude Code to generate test scripts significantly speeds up initial test
coverage. A suite of 5 tests covering login, cart, and checkout was generated
and passing in under 10 minutes. The human review step ensures the generated
code is correct, maintainable, and follows best practices — combining the speed
of AI with the judgment of a QA engineer.

This workflow directly reflects industry best practices for AI-assisted QA
automation, where AI handles boilerplate generation and humans handle review,
validation, and edge case thinking.
