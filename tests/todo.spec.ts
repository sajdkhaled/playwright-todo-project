import {test , expect} from '@playwright/test'
import User from '../models/User';
import RegisterPage from '../pages/RegisterPage';
import NewTodoPage from '../pages/NewTodoPage';
import TodoPage from '../pages/TodoPage';

//Test case 1: Add a todo item and verify it is added successfully
test('should be able to add a todo item', async ({page, request, context}) => {
   //Create a new user 
    const user = new User();
   

//Register Using the API
const regitserPage = new RegisterPage(page, request,context);
await regitserPage.registerUsingTheApi(user);

//UI Steps
const newTodoPage = new NewTodoPage(page);
await newTodoPage.load();

await newTodoPage.addNewTask("Playwright");
const todoPage = new TodoPage(page);
const todoText = await todoPage.getTodoTextByIndex(0);
expect(todoText).toEqual("Playwright");
});


//Test case 2: Delete a todo item and verify it is deleted successfully
test('should be able to delete a todo item', async ({page, request, context}) => {
    
    const user = new User(); 

//Register Using the API

const regitserPage = new RegisterPage(page, request,context);
await regitserPage.registerUsingTheApi(user);
//Add Todo using the API

const newTodoPage = new NewTodoPage(page, request);
await newTodoPage.addNewTaskUsingApi(user); 

const todoPage = new TodoPage(page);
await todoPage.load();

await todoPage.deleteTodoByIndex(0);

const noTodoMessage = todoPage.getNoTodosMessage();
await expect(noTodoMessage).toBeVisible();

 });