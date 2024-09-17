import { test, expect } from '@playwright/test';

test.describe('Our Visual Regresion tests on Hotell APP', () => {

    test('First Visual Regression test on Client Page', async ({ page }) => {

        await page.goto(`${process.env.BASE_URL}`);
        await expect(page).toHaveScreenshot('login-page.png')
        await page.locator('input[type="text"]').fill(`${process.env.USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveScreenshot('dashboard-page.png')
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
        await expect(page).toHaveScreenshot('dashboard-page.png')
        await expect(page).not.toHaveScreenshot('login-page.png')
        await page.goto(`${process.env.CLIENTS_VIEW_URL}`);
        await expect(page.getByText('Clients')).toBeVisible();
        await expect(page.locator('h2')).toContainText('Clients');
        await expect(page).toHaveScreenshot('clientview-page.png')
        await page.goto(`${process.env.CLIENTS_CREATE_URL}`);
        await expect(page.getByText('New Client')).not.toBeHidden();
        await expect(page).toHaveScreenshot('clientcreate-page.png');
        await page.goto(`${process.env.CLIENTS_EDIT_URL}`);
        await expect(page.getByText('Client')).toBeVisible();
        await expect(page).toHaveScreenshot('clientedit-page.png');
        // await page.waitForTimeout(2000);

        // dont use this code block 

    });

    test('Second Visual Regression test on Bill Page', async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await expect(page).toHaveScreenshot('login-page.png')
        await page.locator('input[type="text"]').fill(`${process.env.USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
        await expect(page).toHaveScreenshot('dashboard-page.png')

        // assert that dashboard page dont have login-page.png 
        // assert that you are not longer on login-page 

        await expect(page).not.toHaveScreenshot('login-page.png')
        await expect(page.getByText('log in ')).toBeHidden();

         /*

         if you dont use not in row 38 you will get error messages below down 

        await expect(page).toHaveScreenshot('login-page.png')

         Error: Screenshot comparison failed:

         255995 pixels (ratio 0.28 of all image pixels) are different.   

        */

        await page.goto(`${process.env.BILLS_VIEW_URL}`);
        await expect(page).toHaveScreenshot('bill-view-page.png')

        // assert when go to create bill page that the page on that site is not page for bill view

        await page.goto(`${process.env.BILLS_CREATE_URL}`);
        await expect(page).not.toHaveScreenshot('bill-view-page.png')
        await expect(page).toHaveScreenshot('bill-create-page.png')

        // assert that you se text bills on bill view page and not that you are on room page with titel rooms 

        await page.goto(`${process.env.BILLS_VIEW_URL}`);
        expect (page).toHaveURL(`${process.env.BILLS_VIEW_URL}`);
        await expect(page.getByText('Bills')).toBeVisible();
        await expect(page.getByText('Rooms')).toBeHidden();

        // go to bill edit page and assert that the page dont have snapshot of bill view.

        await page.goto(`${process.env.BILLS_EDIT_URL}`);
        await expect(page).not.toHaveURL(`${process.env.BILLS_VIEW_URL}`);
        await expect(page).toHaveScreenshot('bill-edit-page.png');
        await expect(page).not.toHaveScreenshot('bill-create-page.png');
        await expect(page).toHaveURL(`${process.env.BILLS_EDIT_URL}`);
        await page.waitForTimeout(2000);

    });

    test('third Visual Regression test on Room Page using mask method for number in text and link on room link', async ({ page }) => {

        await page.goto(`${process.env.BASE_URL}`);
        await expect(page).toHaveScreenshot('login-page.png')
        await page.locator('input[type="text"]').fill(`${process.env.USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
        await expect(page).toHaveURL(`${process.env.DASHBOARD_VIEW_URL}`);

        // mask textnumber 2 and link button on room box on website and create a snapshot of it 

        await expect(page).toHaveScreenshot('dashboard-page-mask.png',{
            mask: [page.locator('#app > div > div > div:nth-child(1) > a'),
            page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).locator('div')],
            maskColor: '#d55360'
        })

        /* detta test failade när siffran på div blev 3 och inte 2 efter att jag skapde rum i test 4. 
           Länken med siffran 2 kunde inte längra maskeras eftersom det element inte finns längre.
           länken den första är fortfarande maskad men det beror på att den i page locator i
           nte har id nummret direkt 

           Tänk på hur texten på olika länkar knappar förändras om saker läggs till/tas bort vad är bäst att använda 
           css selector eller inbyggda locators ? 

       
        */

    });

    test ('fourth Visual Regression test on Room Page create a room and delete it ', async ({ page }) => {

        await page.goto(`${process.env.BASE_URL}`);
        await expect(page).toHaveScreenshot('login-page.png')
        await page.locator('input[type="text"]').fill(`${process.env.USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
        await expect(page).toHaveScreenshot('dashboard-page.png');

        // go to room page and assert that it has room-page-view.png

        await page.goto(`${process.env.ROOMS_VIEW_URL}`);
        await expect(page.getByText('Rooms')).toBeVisible();
        await expect(page).toHaveScreenshot('Room-view-page.png');
        await expect(page).not.toHaveScreenshot('dashboard-page.png');
        await expect(page.getByText('Clients')).toBeHidden();
        await expect(page.getByText('Rooms')).toBeVisible();

        // create room 

        await page.goto(`${process.env.ROOMS_CREATE_URL}`);
        await expect(page).toHaveScreenshot('Room-create-page.png');
        await page.getByRole('combobox').selectOption('single');
        await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill('7');
        await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill('4');
        await expect(page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton')).toHaveValue('4');
        await page.locator('.checkbox').click();
        await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').fill('2000');
        await expect(page.locator('div').filter({hasText: /^Price$/  }).getByRole('spinbutton')).not.toHaveValue('4');
        await page.getByRole('listbox').selectOption('balcony');
        await page.getByText('Save').click();

       // assert that the room booking is done by having all room details on room list pages.

        await expect(page.getByText('7 Floor 4, Room 7Category:')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Floor 4, Room' })).toBeVisible();
        await expect(page.getByText('Category: single')).toBeVisible();
        await expect(page.getByText('Available: true').nth(2)).toBeVisible();
        await expect(page.getByText('Price: 2000kr').nth(1)).toBeVisible();
        await expect(page.getByText('Features: balcony', { exact: true })).toBeVisible();

        // asser that the snapshoot when you are on room page not look like in room-view-page.png and that the page now have snapshot Room-view-with-3-rooms.png

        await expect(page).not.toHaveScreenshot('Room-view-page.png');

        await expect(page).toHaveScreenshot('Room-view-page-with-3-rooms.png');

        // delete the room and then assert that the page now has screenshot Room-view-page 

        await page.getByRole('img').nth(2).click();
        await page.getByText('Delete').click();
        await expect(page).toHaveScreenshot('Room-view-page.png');
        await expect(page).not.toHaveScreenshot('Room-view-page-with-3-rooms.png');

        // go to dashboard page and ensure that dashboard page look like before create a room by assert that this has snapshot dashboard-page 

        await page.goto(`${process.env.DASHBOARD_VIEW_URL}`);
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
        await expect(page).toHaveScreenshot('dashboard-page.png');
        await page.waitForTimeout(2000);

    }); 

    test.only('Five Visual Regression test on Room Page using screenshot on wrong login', async ({ page }) => {

        await page.goto(`${process.env.BASE_URL}`);
        await page.locator('input[type="text"]').fill(`${process.env.USERNAME}`);

        // fill in wrong password and assert that the page dont longer have screenshots login.pgn 

        await page.locator('input[type="password"]').fill("apa");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).not.toBeVisible();
        await expect(page).not.toHaveScreenshot('login-page.png');

        // assert that the page has wrong inlogg snapshots now when you filled in wrong password. 

        // assert that you get a fullpage screenshot of the wrong inlogg. 

        await expect(page).toHaveScreenshot('login-page-wrong-password.png'),{fullPage:true};

        // assert that you get a snapshot of just the error message element 

        const wronginloggelement= page.locator('#app > div > div')

        await expect(wronginloggelement).toHaveScreenshot('element-snapshot-with-text-badusername-or-badpassword.png');

    });
    test('Six Visual Regression test mask a part of reservation page ', async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.locator('input[type="text"]').fill(`${process.env.USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
        await page.goto(`${process.env.RESERVATIONS_VIEW_URL}`);
        await expect(page.getByText('Reservations')).toBeVisible();
        await expect(page).toHaveScreenshot('reservation-view-page.png');
        
        // mask the reservation page and assert that the page now have that screenshoot 

        await expect(page).toHaveScreenshot('resveration-view-page-mask.png',{
            mask: [page.locator('#app > div > div.reservations > div')],
            maskColor: '#d55303'
        })
       

    });

    test('Seventh Visual Regression test change reservation page and expect new snapshot ', async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.locator('input[type="text"]').fill(`${process.env.USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
        await page.goto(`${process.env.RESERVATIONS_VIEW_URL}`);
        await expect(page.getByText('Reservations')).toBeVisible();
        await expect(page).toHaveScreenshot('reservation-view-page.png');
        await page.locator('#app > div > div.reservations > div > div.action > img').click();
        await page.locator('#app > div > div.reservations > div > div.menu > a:nth-child(2)').click();

        // do assert that you see error message and assert that the page now have screenshoot without reservations 

        await expect(page.locator('#app > div > div:nth-child(3) > p')).toBeVisible();

        await expect(page).toHaveScreenshot('reservation-view-without-reservation-page.png');

        // do assert on the specifik element that show no users
  
        const element = page.locator('#app > div > div:nth-child(3) > p');

        await expect(element).toHaveScreenshot('element-snapshot-with-text-no-reservations.png');



    });

});
