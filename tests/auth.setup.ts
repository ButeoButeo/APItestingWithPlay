import {test as setup} from '@playwright/test';
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'

/* setup('autentication', async({page}) => {
    await page.goto('https://conduit.bondaracademy.com');
    await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name:'Email'}).fill("testerqa20252025@gmail.com")
    await page.getByRole('textbox', {name:'Password'}).fill("Aa123456789@2025")
    await page.getByRole('button').click()
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')



    await page.context().storageState({path: authFile})

}) */
    setup('autentication', async({page, request}) => {

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data:{
          "user":{"email":"testerqa20252025@gmail.com", "password":"Aa123456789@2025"}
        }
      })
      const responseBody = await response.json()
      const accessToken = responseBody.user.token

      user.origins[0].localStorage[0].value=accessToken
      fs.writeFileSync(authFile,JSON.stringify(user))

      process.env['ACCESS_TOKEN'] = accessToken
    })