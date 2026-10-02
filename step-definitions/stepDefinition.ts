import {
    Given,
    When,
    Then
} from "@cucumber/cucumber";

import { FrameLocator } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { PIMPage } from "../pages/PIMPage";
import { CommonUtils } from "../util/CommonUtils";
import { AssertUtil } from "../util/AssertUtil";
import {setDefaultTimeout} from "@cucumber/cucumber";

setDefaultTimeout(30000);






const loginPage = new LoginPage();
const pimPage = new PIMPage();

let pimFrame: FrameLocator;


// Login Step
Given("log in to the application", async function () {

    await loginPage.login();

});


// Verify Welcome Message
Then("verify Welcome Suneetha", async  () => {
   // Then("verify Welcome selenium", async  () => {

    const welcomeText = await CommonUtils.getElementText(
        loginPage.getWelcomePage()
    );

    await AssertUtil.assertEquals(
        welcomeText,
        "Welcome Suneetha"
    );

});


// Move Mouse to PIM
When("move the mouse to the PIM", async  () => {

    await CommonUtils.moveToElement(
        pimPage.getPim()
    );

});


// Click Add Employee
When("click on the Add Employee button", async  () => {

    await CommonUtils.clilkElement(
        pimPage.getAddEmp()
    );

});


// Switch to iframe
When("switch to the iframe", async  () => {

    pimFrame =
        await CommonUtils.switchToFrameUsingIdOrName(
            pimPage.getFrame()
        );

});


// Enter First Name
When(
    "enter the first name {string} into the first name field",
    async (firstName: string)=> {

        await CommonUtils.enterValueInFrame(
            pimFrame,
            pimPage.getFirstName(),
            firstName
        );

    }
);


// Enter Last Name
When(
    "enter the last name {string} into the last name field",
    async  (lastName: string)=> {

        await CommonUtils.enterValueInFrame(
            pimFrame,
            pimPage.getLastName(),
            lastName
        );

    }
);


// Click Save Button
When(
    "click the Save button to add the new employee",
    async  () => {

        await CommonUtils.clickElementInFrame(
            pimFrame,
            pimPage.getSave()
        );

    }
);


// Click Edit Button
When("click the Edit button", async  () => {

    await CommonUtils.clickElementInFrame(
        pimFrame,
        pimPage.getEdit()
    );

});


// Verify Smoker Checkbox
Then("verify checkbox inside a frame", async  () => {

    const isChecked =
        await CommonUtils.isElementChecked(
            pimFrame,
            pimPage.getChkSmoker()
        );

    await AssertUtil.assertTrue(isChecked);

    console.log("Checkbox is checked");

});


// Click Back Button
When(
    "click the Back button to return to the previous page",
    async  () => {

        await CommonUtils.clickElementInFrame(
            pimFrame,
            pimPage.getBackButton()
        );

    }
);


// Select Search Dropdown
When(
    "search employee first name in search field",
    async  () => {

        await CommonUtils.selectDropDownValue(
            pimFrame,
            pimPage.getSearchByDropdown(),
            "Emp. First Name"
        );

    }
);


// Enter Employee First Name
When(
    "enter employee first name in search field",
    async  () => {

        await CommonUtils.enterValueInFrame(
            pimFrame,
            pimPage.getSearchFor(),
            "Sri"
        );

    }
);


// Click Search Button
When("click the search button", async  () =>{

    await CommonUtils.clickElementInFrame(
        pimFrame,
        pimPage.getSearchButton()
    );

});


// Verify Employee Name
Then(
    "verify that the employee name displayed matches {string}",
    async  (expectedEmployeeName: string) =>{

        const actualEmployeeName =
            await CommonUtils.getElementTextInFrame(
                pimFrame,
                pimPage.getEmployeeName()
            );

console.log("actualEmployeeName : "+actualEmployeeName);
console.log("expectedEmployeeName : "+expectedEmployeeName);

        await AssertUtil.assertEquals(
            actualEmployeeName,
            expectedEmployeeName
        );

    }
);