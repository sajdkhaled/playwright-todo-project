import { APIRequestContext, Page } from "playwright-core";
import TodoApi from "../apis/TodoApi";
import User from "../models/User";

export default class NewTodoPage {

    private page: Page;
    private request?:APIRequestContext;
    
    //constructor
    constructor(page: Page, request?: APIRequestContext) {
        this.page = page;
        this.request = request;
    }
    
    
 //Elements
  private get newTodoInput() {
    return '[data-testid="new-todo"]';
  } 
  private get submitButton() {
    return '[data-testid="submit-newTask"]';
  } 

//Methods or Steps

async load() {
    await this.page.goto('/todo/new');
  } 

  async addNewTask(todo : string) {
    await this.page.type(this.newTodoInput, todo);
    await this.page.click(this.submitButton);
  }

  async addNewTaskUsingApi(user: User) {
  await new TodoApi(this.request!).addTask(user);

  }
}