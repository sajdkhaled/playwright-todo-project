import { Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import { APIRequestContext } from "@playwright/test";
import { BrowserContext } from "@playwright/test";
import confiq from '../playwright.config'


export default class RegisterPage{
private page: Page;
private request?: APIRequestContext;
private context? : BrowserContext;

//constructor
constructor(page: Page, request?: APIRequestContext, context?: BrowserContext) {
    this.page = page;
    this.request = request;
    this.context = context;
}


//Elements
private get firstNameInput() {
     return '[data-testid="first-name"]'}
private get lastNameInput() { 
    return '[data-testid="last-name"]'; }     
private get emailInput() {
    return '[data-testid="email"]'; }   
    private get passwordInput() {
    return '[data-testid="password"]'; }    
    private get confirmPasswordInput() {
    return '[data-testid="confirm-password"]'; }  
    private get submitButton() {
    return '[data-testid="submit"]'; }      


//Methods or Steps
async load() {
    await this.page.goto('/signup'); 
}

async register(user:User) {
    await this.page.type(this.firstNameInput, user.getFirstName());
    await this.page.type(this.lastNameInput, user.getLastName());
    await this.page.type(this.emailInput, user.getEmail());
    await this.page.type(this.passwordInput, user.getPassword());
    await this.page.type(this.confirmPasswordInput, user.getPassword());
    await this.page.click(this.submitButton);

}
async registerUsingTheApi(user:User) {
   const response = await new UserApi(this.request!).register(user);
   const responseBody = await response.json();
   const accessToken = responseBody.access_token;
   const userID = responseBody.userID;
   const firstName = responseBody.firstName;
   
   
   user.setAccessToken(accessToken);
   
   await this.context!.addCookies([{
    
       //first we need to set the cookie in the browser context
       name: 'access_token', // from the application 
       value: accessToken,   // from the API response
       url: confiq.use?.baseURL, // from url 
   },
   
   //for the firstName and userID we can set them as cookies as well
   {
       name: 'firstName', 
       value: firstName,   
       url: confiq.use?.baseURL, 
    },
   {
       name: 'userID', 
       value: userID,   
       url: confiq.use?.baseURL, 
    }
   
   ]);
    
}
}