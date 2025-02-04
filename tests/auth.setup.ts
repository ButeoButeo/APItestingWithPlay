import {test as setup} from '@playwright/test';

const authFile = '.auth/user.json'

setup('autentication', async({page}) => {
    await page.goto('https://conduit.bondaracademy.com');
    await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name:'Email'}).fill("testerqa20252025@gmail.com")
    await page.getByRole('textbox', {name:'Password'}).fill("Aa123456789@2025")
    await page.getByRole('button').click()
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')



    await page.context().storageState({path: authFile})

})