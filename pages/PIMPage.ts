export class PIMPage {

  private by_pim = "xpath=//li[@id='pim']";
  private by_addEmp = "xpath=//*[@id='pim']/ul/li[2]/a";

  private by_iframe = "iframe[name='rightMenu']";

private by_pim_addemp = "xpath=//li[text()='PIM : Add Employee']";


  private by_firstName = "xpath=//input[@id='txtEmpFirstName']";
  private by_lastName = "xpath=//input[@id='txtEmpLastName']";
  private by_save = "xpath=//input[@id='btnEdit']";
  private by_edit = "xpath=//input[@id='btnEditPers']";
  private by_chkSmoker = "xpath=//input[@id='chkSmokeFlag']";
  private by_back = "xpath=//input[@class='backbutton']";

  private by_searchByDropdown = "xpath=//select[@id='loc_code']";
  private by_searchFor = "xpath=//input[@id='loc_name']";
  private by_searchButton = "xpath=//*[@id='standardView']/div[2]/input[2]";
  private by_employeeName = "xpath=//a[contains(text(),'Sri')]";


  getPim(): string {
     return this.by_pim;//"xpath=//li[@id='pim']"
  }

  getAddEmp(): string {
    return this.by_addEmp;
  }

  getPimAddEmp(): string {
        return this.by_pim_addemp; //"xpath=//li[text()='PIM : Add Employee']"
    }

  getFrame(): string {
    return this.by_iframe;//"iframe#rightMenu"
  }

  getFirstName(): string {
    return this.by_firstName;
  }

  getLastName(): string {
    return this.by_lastName;
  }

  getSave(): string {
    return this.by_save;
  }

  getEdit(): string {
    return this.by_edit;
  }

  getChkSmoker(): string {
    return this.by_chkSmoker;//"xpath=//input[@id='chkSmokeFlag']"
  }

  getBackButton(): string {
    return this.by_back;
  }

  getSearchByDropdown(): string {
    return this.by_searchByDropdown; //"xpath=//select[@id='loc_code']"
  }

  getSearchFor(): string {
    return this.by_searchFor;
  }

  getSearchButton(): string {
    return this.by_searchButton;
  }

  getEmployeeName(): string {
    return this.by_employeeName;
  }
}