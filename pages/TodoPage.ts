import { Page } from "@playwright/test";

export default class TodoPage{
private page: Page;
//constructor
constructor(page: Page) {
    this.page = page;
}
  
//Elements
get welcomeMessage() {
    return'[data-testid="welcome"]';
}

private get todoItem() {
    return '[data-testid="todo-item"]';
}   

private get deleteIcon() {
    return '[data-testid="delete"]';
}

private get noTodosMessage() {
    return '[data-testid="no-todos"]';
}   
    async load(){
    await this.page.goto('/todo');
}

getwelcomeMessage() {
    return this.page.locator('[data-testid="welcome"]');
}
getTodoTextByIndex(index: number) {
    return this.page.locator(this.todoItem).nth(index).innerText(); 
}

async deleteTodoByIndex(index: number) {
    await this.page.locator(this.deleteIcon).nth(index).click();    

}
getNoTodosMessage() {
    return this.page.locator(this.noTodosMessage);  
}
}