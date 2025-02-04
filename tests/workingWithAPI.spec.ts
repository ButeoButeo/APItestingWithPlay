import { test, expect, request } from '@playwright/test';
import tags from '../test-data/tags.json'

test.beforeEach(async ({page}) => {
  //https://conduit-api.bondaracademy.com
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })
  await page.goto('https://conduit.bondaracademy.com');
})

test('has title', async ({ page }) => {
  await page.route('*/**/api/articles*', async route => {
    const response = await route.fetch()
    const responseBody = await response.json()
    responseBody.articles[0].title = "This is a MOCK test title"
    responseBody.articles[0].description = "This is a MOCK description"

    await route.fulfill({
      body: JSON.stringify(responseBody)
    })
 
  await page.getByText('Global Feed').click()
  // Expect a title "to contain" a substring.
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title')
  await expect(page.locator('app-article-list p').first()).toContainText('This is a MOCK description')
});
})

test('delete article', async({page, request})=>{
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data:{
      "user":{"email":"testerqa20252025@gmail.com", "password":"Aa123456789@2025"}
    }
  })
  const responseBody = await response.json()
  console.log(responseBody)
})


