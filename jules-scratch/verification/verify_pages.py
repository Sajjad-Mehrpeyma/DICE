from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        base_url = "http://localhost:5173"
        pages = [
            {"path": "command-center", "element": "h1"},
            {"path": "setup-data-hub", "element": "h1"},
            {"path": "ai-copilot", "element": "h1"},
            {"path": "scenario-orchestrator", "element": "h1"},
            {"path": "market-signals", "element": "h1"},
            {"path": "pulse-alerts", "element": "h1"},
            {"path": "insights-briefs", "element": "h1"},
            {"path": "governance-audit", "element": "h1"},
        ]

        for i, page_info in enumerate(pages):
            try:
                page.goto(f"{base_url}/{page_info['path']}", wait_until="domcontentloaded", timeout=30000)
                page.wait_for_selector(page_info['element'], timeout=10000)
                page.screenshot(path=f"jules-scratch/verification/verification_{i}.png")
            except Exception as e:
                print(f"Error navigating to {page_info['path']}: {e}")


        browser.close()

run()
