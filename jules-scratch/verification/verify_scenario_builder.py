from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:3000/scenario")
    page.wait_for_selector("text=Scenario Input")
    page.screenshot(path="jules-scratch/verification/scenario-builder.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
