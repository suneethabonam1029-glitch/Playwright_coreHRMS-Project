import { expect } from "@playwright/test";

export class AssertUtil {


static assertEquals(actual:string,expected:string):void
{
  actual = (actual ?? '').replace(/\s+/g, ' ').trim();
    expected = (expected ?? '').replace(/\s+/g, ' ').trim();
    if(actual === expected)
    {
           console.log("Expected: " + expected + " is matched with Actual: " + actual);
    }else{
           console.log("Expected: " + expected + " is not matched with Actual: " + actual);
    } 
}
static assertTrue(actual: boolean) {
    expect(actual).toBe(true); 
  }

  /*
  static async assertTrue(actual: boolean) {
    expect(true).toBe(true); 
  }
*/
  static  assertFalse(actual: boolean) {
    expect(actual).toBe(false); 
  }
}