# AngularTest

## Introduction

This is a simple web application which contains three entities; customers, products and orders. It uses the `angular/in-memory-web-api` library (see https://github.com/angular/in-memory-web-api) to mimic a database and api.

## Data

The entity types are contained in the `models` folder.

The following files are contained in the `app-data` folder

- `add-data.interface.ts` contains the `AppData` interface.
- `db.service.ts` the setup for the `angular/in-memory-web-api`
- `api-data-api.service.ts` an Angular service which uses the `HttpClient` to retrieve data from the mock apis/

## Instructions

1. Display a list of orders in a table in the `orders-page.component.ts` file, with the following headers

   - Order Id
   - Customer Name
   - Order Date (formatted as `dd/MM/yyyy`)
   - Product Name

2. Implement the select to filter orders by customer name in the `orders-page.component.ts`. The select should

   - Should contain options for each of the customer names as well as an empty option.
   - The empty option should be initially selected.
   - When the empty option is selected all orders should be shown.
   - When a customer name option is selected the orders should be filtered by customer name.
   - The selected option should always show the currently selected customer, ensure it doesn't reset when navigating between pages.

3. Display the properties of the selected customer (the one chosen in the select on the `/orders` page) when navigated to the `/customer` route from the `<nav>`. If no customer is selected nothing should be displayed.

4. Set the change detection strategy to `ChangeDetectionStrategy.OnPush` in all of the components.

You will be assessed on your use of RxJs, how you structure your code, your use of types and general best practices. You don't need to style the application or write unit tests. The test should take around 2 hours to complete.

## Guidelines

We are looking for solutions which demonstrate a good understaning of Angular in particular the ability to use RxJs to model shared state in an application.

- Your code shouldn't use the subscribe method, use the async pipe
- You shouldn't import any additional Angular modules, e.g. Forms are not required
- The app should only make one call to each of the endpoints `api/customers`, `api/orders` and `api/products` when the `/orders` route is first navigated to (i.e. when the application starts). Prevent the app from making any additional http calls. Note that http calls won't show up in your browsers network tab because of the `angular/in-memory-web-api`, you'll need to log to the console to check how many http calls are made.
- There should be minimal logic in the components.
  - The templates shouldn't contain anything more sophisticated than an `async` pipe, a `date` pipe or simple template expressions `{{ }}` e.g. don't add additional pipes to do filtering or have any other logic in the template such as calling functions.
  - The typescript should only contain logic that is needed for the view.
- Avoid reimplementing existing language features such as JavaScript array methods.
- Don't use route parameters to display the selected customer.
- Don't use `ChangeDetectorRef` to get `OnPush` change detection to work. Hint: change detection will still run when an observable (bound to the template using the async pipe) emits a new value.
