
import "../step-definitions/BaseTest";   //THIS IS THE KEY
import { FrameLocator, Page, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { PIMPage } from "../pages/PIMPage";
import { CommonUtils } from "../util/CommonUtils";
import { AssertUtil } from "../util/AssertUtil";
import configData from "../config/configData.json";




const loginPage: LoginPage = new LoginPage();
const pimPage: PIMPage = new PIMPage();

test("Verify that an employee can be added successfully", async (page) => {

    // call the Login page


    await loginPage.login();

  await  AssertUtil.assertEquals(await CommonUtils.getElementText(loginPage.getWelcomePage()), "Welcome selenium");

   await CommonUtils.moveToElement(pimPage.getPim());

    await CommonUtils.clilkElement(pimPage.getAddEmp());


 let pimFrame: FrameLocator = await CommonUtils.switchToFrameUsingIdOrName(pimPage.getFrame());//await this.page.frameLocator(selector)




await CommonUtils.enterValueInFrame(pimFrame,pimPage.getFirstName(), configData.firstname);

await CommonUtils.enterValueInFrame(pimFrame,pimPage.getLastName(), configData.lastname);

    await CommonUtils.clickElementInFrame(pimFrame, pimPage.getSave());

    await CommonUtils.clickElementInFrame(pimFrame, pimPage.getEdit());

    await AssertUtil.assertTrue(await CommonUtils.isElementChecked(pimFrame, pimPage.getChkSmoker()));

console.log("checked");

await CommonUtils.hardWait(3);
   await CommonUtils.clickElementInFrame(pimFrame, pimPage.getEdit());


await CommonUtils.clickElementInFrame(pimFrame, pimPage.getBackButton());


await CommonUtils.selectDropDownValue(pimFrame,pimPage.getSearchByDropdown(),configData.dropdownoption);


await CommonUtils.enterValueInFrame(pimFrame,pimPage.getSearchFor(), configData.firstname);

await CommonUtils.clickElementInFrame(pimFrame, pimPage.getSearchButton());


await AssertUtil.assertEquals(await CommonUtils.getElementTextInFrame(pimFrame,pimPage.getEmployeeName()),"Hanu DSU")



});

  /*

    test("Verify that the search functionality returns the correct employee", async () => {

        //await AssertUtil.assertTrue("Akki", "Akki");

        await loginPage.login();


 await  AssertUtil.assertEquals(await CommonUtils.getElementText(loginPage.getWelcomePage()), "Welcome selenium");

await CommonUtils.moveToElement(pimPage.getPim());

  await CommonUtils.clilkElement(pimPage.getAddEmp());



    });


  
    test("Verify that employee details can be edited successfully", async () => {

        await AssertUtil.assertTrue("Akki", "Akki");

    });

    test("Verify that an employee can be deleted successfully", async () => {

        await CommonUtils.moveToElement(pimPage.getPim());

        await CommonUtils.clickElement(pimPage.getAddEmp());

    });

    test("Verify that the employee list is displayed correctly with accurate information", async () => {

        await AssertUtil.assertTrue("akki", "akki");

    });

    test("Verify that photos can be added to employee profiles", async () => {

        // Implementation Pending

    });

    test("Verify that employee details are correctly displayed", async () => {

        // Implementation Pending

    });

    test("Verify that the employment status of an employee can be updated", async () => {

        // Implementation Pending

    });

    test("Verify that the employee list can be filtered based on various criteria", async () => {

        // Implementation Pending

    });


*/
