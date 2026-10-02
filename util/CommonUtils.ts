
import configData from "../config/configData.json";


import {
  chromium,
  firefox,
  webkit,
  Locator,
  FrameLocator,
  Frame,
  Browser,

  Page,
  selectors
} from "@playwright/test";
import { AssertUtil } from "./AssertUtil";

export class CommonUtils {
    static configData: any;
    static browser: Browser;
    static page: Page;
    static context: any;
    static frame: FrameLocator;
    static pimFrame: any;
   
 


  //=============================
  // Browser Setup
  //=============================


     public static async startBrowser(): Promise<void> {

    try {

        const browserName:string =  configData.browser.toLowerCase();//firefox

        switch (browserName) {

            case "firefox":
                this.browser = await firefox.launch({ headless: false });
                break;

            case "chromium":
                this.browser = await chromium.launch({ headless: false });
                break;

            default:
                console.log("Invalid browser name. Launching Chromium by default...");
                this.browser = await chromium.launch({ headless: false });
                break;
        }

        this.page = await this.browser.newPage();


        await this.page.goto(configData.url);

    } catch (error: any) {

        console.log("Failed to start browser: " + error.message);
       

    }
}
  //=============================
  // Find Element
  //=============================

 
public static  findElement(selector: string):Locator  {

 
    let element: Locator = null as any;

    try {
        element =  this.page.locator(selector);
    } catch (error: any) {
        AssertUtil.assertFalse(error.message);
    }

    return element;//this.page.locator("xpath=//li[@id='pim']")
}

public static  findElementInFrame(selector: string):Locator  {

 
    let element: Locator = null as any;

    try {
        element = this.frame.locator(selector);
    } catch (error: any) {
        AssertUtil.assertFalse(error.message);
    }

    return element;
}

  //=============================
  // Click
  //=============================


static async getElementTextInFrame(pimFrame: FrameLocator,selector:string):Promise<string>
{
   let text: string="";
    try
    {
          let pageText: string | null =  await pimFrame.locator(selector).textContent();//PIM : Add Employee
    
          if(pageText!=null)
          {
              text = pageText; //PIM : Add Employee
          }

        }catch(error: any)
    {
      AssertUtil.assertFalse(error.message);
    }


    return text;//PIM : Add Employee
}




public static async clilkElement(selector:string):Promise<void>
{
  
   try{

      await this.findElement(selector).click();
   }catch(error : any)
   {
        AssertUtil.assertFalse(error.message);
   }

}



  public static async clickElementInFrame(pimFrame: FrameLocator, selector: string): Promise<void> {

    try {
       await pimFrame.locator(selector).click();

    } catch (error: any) {
        AssertUtil.assertFalse(error.message);
    }
    
  }



  //=============================
  // Enter Value
  //=============================



static async enterValue(selector: string, value: string): Promise<void> {
  try {
    const element = await this.findElement(selector);
   
  
    await element.fill(value);
   
   } catch (error: any) {
        AssertUtil.assertFalse(error.message);
  }
}



public static async enterValueInFrame(pimFrame: FrameLocator,selector: string,value: string): Promise<void> {
    try {
        await pimFrame.locator(selector).fill(value);
    } catch (error: any) {
        AssertUtil.assertFalse(error.message);
    }

}


public static async isElementChecked(frame: FrameLocator,selector: string): Promise<boolean> {
  
  let element: boolean=false;

  try {
    let locator = frame.locator(selector);

    await locator.click();
    
   element = await locator.isChecked();

  } catch (error: any) {
    AssertUtil.assertFalse(error.message);
  }


 return element;
}



//=============================
  // Frames
  //=============================



//switchToFrameUsingIdorName

static  switchToFrameUsingIdOrName(selector: string): FrameLocator {
  let frame: FrameLocator = null as any;

    try {
        frame =  this.page.frameLocator(selector);
    } catch (error: any) {
        AssertUtil.assertFalse(error.message);
    }

    return frame;
}




  //=============================
  // Windows
  //=============================

  static async switchToWindow(): Promise<Page> {

    const newPage = await this.context.waitForEvent("page");

    await newPage.waitForLoadState();

    return newPage;

  }




  static async closeAllWindows(): Promise<void> {

    await this.context.close();

  }

  //=============================
  // Waits
  //=============================

  static async hardWait(seconds: number): Promise<void> {

    await this.page.waitForTimeout(seconds * 1000);

  }


  static async waitForElementToBeVisibleBySelector(
    selector: string
  ): Promise<boolean> {

    try {

      await this.page.locator(selector).waitFor({

        state: "visible"

      });

      return true;

    } catch {

      return false;

    }

  }

public static async selectDropDownValue(frame: FrameLocator,selector: string,option: string): Promise<void> {
    
     try {
    await frame.locator(selector).selectOption(option);

     } catch(error : any) {
        
     AssertUtil.assertFalse(error.message);

     }

}

public static async selectDropDownIndex(locator: Locator, index: number): Promise<void> {
    await locator.selectOption({ index });
}

public static async selectDropDownVisibleText(
    locator: Locator,
    visibleText: string
): Promise<void> {
    await locator.selectOption({ label: visibleText });
}

public static async verifySelectedValue(
    locator: Locator,
    expectedValue: string
): Promise<void> {

    const actualValue = await locator.inputValue();

    if (actualValue.trim() === expectedValue) {
        console.log(`PASS : Selected value verified → ${actualValue}`);
    } else {
        console.log(`FAIL : Expected → ${expectedValue} | Found → ${actualValue}`);
    }
}


public static async uploadFile(locator: Locator, filePath: string): Promise<void> {
    await locator.setInputFiles(filePath);
}






public static async verifyElementSelected(
    locator: Locator,
    elementName: string
): Promise<void> {

    if (await locator.isChecked()) {
        console.log(`${elementName} is selected.`);
    } else {
        console.log(`${elementName} is NOT selected.`);
    }
}



public static async doubleClickElement(locator: Locator): Promise<void> {
    await locator.dblclick();
}

public static async rightClickElement(locator: Locator): Promise<void> {
    await locator.click({ button: 'right' });
}



public static async acceptAlert(page: Page): Promise<void> {
    page.once('dialog', async dialog => {
        await dialog.accept();
    });
}

public static async dismissAlert(page: Page): Promise<void> {
    page.once('dialog', async dialog => {
        await dialog.dismiss();
    });
}

public static async getAlertText(page: Page): Promise<string> {

    return await new Promise(resolve => {

        page.once('dialog', async dialog => {
            const message = dialog.message();
            await dialog.dismiss();
            resolve(message);
        });

    });
}

public static async enterAlertText(
    page: Page,
    text: string
): Promise<void> {

    page.once('dialog', async dialog => {
        await dialog.accept(text);
    });
}


public static async closeCurrentWindow(page: Page): Promise<void> {
    await page.close();
}



public static getCommonLocatorUsingText(
    page: Page,
    value: string
): Locator {

    return page.locator(`//*[text()='${value}']`);
}

public static async getWindowTitle(page: Page): Promise<string> {
    return await page.title();
}

public static async getCurrentPageUrl(page: Page): Promise<string> {
    return page.url();
}



public static async getElementText(selector: string): Promise<string> {

    let text: string = "";

    try {
        let pageText: string | null = await this.findElement(selector).textContent();

        if (pageText !== null) {
            text = pageText;
        }
    } catch (error: any) {
        AssertUtil.assertFalse(error.message);
    }

    return text;//Welcome Suneetha
}


public static async getEmpElementText(pimFrame: FrameLocator,selector:string):Promise<string>
{
     let text: string | null="";
   try{

      let pageText = await pimFrame.locator(selector).textContent();//PIM : Add Employee
    if (pageText !== null) {
            text = pageText;
        }
   }catch(error: any)
   {
    AssertUtil.assertFalse(error.message);
   }

  return text;

}



public static async goBack(page: Page): Promise<void> {
    await page.goBack();
}

public static async moveForward(page: Page): Promise<void> {
    await page.goForward();
}



public static async isElementDisplayed(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
}

public static async isElementSelected(locator: Locator): Promise<boolean> {
    return await locator.isChecked();
}

public static async waitForElementToBeVisible(
    locator: Locator
): Promise<boolean> {

    try {

        await locator.waitFor({
            state: 'visible'
        });

        return true;

    } catch {

        return false;
    }
}


public static async moveToElement(selector:string): Promise<void> {
    try {
			await (await this.findElement(selector)).hover();
		 } catch (error: any) {
        AssertUtil.assertFalse(error.message);
    }
  
}



public static async pressEnterKey(page: Page): Promise<void> {
    await page.keyboard.press('Enter');
}

public static async pressTabKey(page: Page): Promise<void> {
    await page.keyboard.press('Tab');
}

public static async pressDeleteKey(page: Page): Promise<void> {
    await page.keyboard.press('Delete');
}

public static async copyText(page: Page): Promise<void> {
    await page.keyboard.press('Control+C');
}

public static async pasteText(page: Page): Promise<void> {
    await page.keyboard.press('Control+V');
}

public static async selectAllText(page: Page): Promise<void> {
    await page.keyboard.press('Control+A');
}

public static async pressArrowDownKey(page: Page): Promise<void> {
    await page.keyboard.press('ArrowDown');
}

public static async pressArrowUpKey(page: Page): Promise<void> {
    await page.keyboard.press('ArrowUp');
}

public static async pressArrowLeftKey(page: Page): Promise<void> {
    await page.keyboard.press('ArrowLeft');
}

public static async pressArrowRightKey(page: Page): Promise<void> {
    await page.keyboard.press('ArrowRight');
}

public static async pressShiftArrowDownKey(page: Page): Promise<void> {
    await page.keyboard.press('Shift+ArrowDown');
}



}