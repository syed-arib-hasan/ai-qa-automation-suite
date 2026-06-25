# AI-Assisted QA Automation Suite

> End-to-end QA automation pipeline using Playwright, Postman, GitHub Actions, Jira, and Claude Code AI

![Build Status](https://github.com/syed-arib-hasan/ai-qa-automation-suite/actions/workflows/playwright.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Playwright](https://img.shields.io/badge/Playwright-latest-blue)
![Claude Code](https://img.shields.io/badge/Claude%20Code-v2.1.190-purple)

---

## 📌 Project Overview

This is a portfolio project demonstrating a complete AI-assisted QA automation
pipeline. It covers UI testing, REST API testing, CI/CD integration, automated
failure notifications, and defect tracking — all connected in one end-to-end
workflow.

Test scripts were generated using **Claude Code** (AI), then manually reviewed,
debugged, and verified before being committed — reflecting real-world
AI-assisted QA engineering practices.

---

## 🛠️ Tech Stack

| Tool           | Purpose                               |
| -------------- | ------------------------------------- |
| Playwright     | UI/E2E test automation                |
| Postman        | REST API testing with assertions      |
| GitHub Actions | CI/CD pipeline                        |
| Claude Code    | AI-assisted test generation           |
| Jira           | Bug tracking and defect management    |
| Gmail SMTP     | Automated failure email notifications |

---

## 🏗️ Project Architecture

```
Developer pushes code to GitHub
            ↓
    GitHub Actions triggers
            ↓
  Playwright UI Tests run on Chromium
            ↓
    ┌───────────────────────┐
    │   Tests Pass ✅        │   → HTML report uploaded as artifact
    │   Tests Fail ❌        │   → Failure notification job triggers
    └───────────────────────┘
            ↓ (on failure)
  Gmail SMTP sends failure email
  with repo, branch, commit, and
  link to the failed Actions run
            ↓
    Bug logged manually in Jira
    with steps to reproduce,
    expected vs actual results
```

---

## ✅ Test Coverage

### UI Tests — Playwright

Tested on: `https://automationintesting.online` (Restful Booker)

| # | Test Case                                         | Status                        |
| - | ------------------------------------------------- | ----------------------------- |
| 1 | Homepage loads and displays hotel name            | ❌ Intentional Failure (demo) |
| 2 | Rooms section is visible on homepage              | ✅ Pass                       |
| 3 | Contact form fills and submits successfully       | ✅ Pass                       |
| 4 | Booking panel shows Check In and Check Out fields | ✅ Pass                       |

### API Tests — Postman

Tested on: `https://restful-booker.herokuapp.com`

| # | Request              | Method | Assertions |
| - | -------------------- | ------ | ---------- |
| 1 | Get Auth Token       | POST   | 2/2 ✅     |
| 2 | Get All Bookings     | GET    | 2/2 ✅     |
| 3 | Create Booking       | POST   | 3/3 ✅     |
| 4 | Get Specific Booking | GET    | 3/3 ✅     |
| 5 | Delete Booking       | DELETE | 1/1 ✅     |

**Total API assertions: 11/11 passing**

---

## ⚙️ CI/CD Pipeline

GitHub Actions runs automatically on every push and pull request to `main`.

Pipeline steps:

1. Checkout code
2. Set up Node.js 20
3. Install dependencies
4. Install Playwright Chromium browser
5. Run Playwright test suite
6. Upload HTML test report as downloadable artifact
7. On failure → send email notification automatically via Gmail SMTP

---

## 🔴 Current Pipeline Status

The pipeline is currently in a **FAILING** state — intentionally.

This is a live demonstration of the failure notification system:

* Test 1 has a deliberately wrong assertion
* GitHub Actions detects the failure
* An automated email is sent immediately with the repo, branch, commit SHA,
  and a direct link to the failed run
* This proves the end-to-end alert system works correctly

To restore the passing state, the assertion in `tests/booking.spec.js` line 6
can be reverted to the correct hotel name.

---

---

## 🤖 AI-Assisted Workflow

Test scripts in this project were generated using  **Claude Code v2.1.190** .

The workflow:

1. Described test scenarios to Claude Code in plain English
2. Claude Code generated the full test file
3. Each test was manually reviewed for correct selectors and assertions
4. Tests were run locally to verify before committing
5. Any issues were debugged and fixed manually

See [AI_PROCESS.md](https://claude.ai/chat/AI_PROCESS.md) for the full prompt, generated output,
and human review process.

---

## 🚀 How to Run Locally

```bash
# Install dependencies
npm ci

# Install Playwright browser
npx playwright install --with-deps chromium

# Run all tests
npx playwright test --project=chromium

# View HTML report
npx playwright show-report
```

---

## 📁 Project Structure

```
ai-qa-automation-suite/
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions CI/CD pipeline
├── postman/
│   └── restful-booker-api-tests.json  # Postman collection
├── tests/
│   └── booking.spec.js         # Playwright UI tests
├── AI_PROCESS.md               # AI-assisted workflow documentation
├── playwright.config.js        # Playwright configuration
└── README.md                   # This file
```
