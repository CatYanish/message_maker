# An overview of design decisions

I created a server side router to handle all HTTP requests for messages, this router is in the guestMessage.js file.

I used for loops to traverse each JSON file, and stored relevant data in  variables in the router.

In each post route, I capture guest name and hotel name from the client request. Next, I call a function to loop through the company data, and  used an if/else statement to set an "adjust to local time" variable, in order to adjust greeting ("Good Morning" vs "Good evening") to be accurate in local time.

Next, I called a for loop to capture guest information and store guest data such as room number in variables that would later fill placeholders in a final custom message.

After completing the for loops and if/else functions to capture hotel and guest data from the client-side request and pull the relevant data from JSON file, a function is called to generate a pre-existing or new custom message.

The personalized message is console logged to terminal.

There is a very minimal UI, but it was not my main focus during the time I spent on this app.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites
- node package manager
- Node.js


### Installing

Use npm install to install dependences.

```
$ npm install
```

When ready, you can run $ npm start to start the server, and go to localhost:5000 for testing.

```
$ npm start
```

## What language you picked and why

I used JavaScript on the server side, with Node.js and Express. I chose Express with Node.js because it
is the server side technology I am most familiar and comfortable with, and because I wanted
to create a router and handle http requests in the simplest and lightest weight way I know how.

On the client side, I used AngularJS to capture input data and make http requests to the server. I chose AngularJS because it is simple create objects to send to the server, because of Angular's nifty data binding.



## Process for verifying the correctness of the program

1. Frequent console logging of all variables.
2. Console logging the final message result in terminal, and testing with various guest and hotel name combinations.
3. Testing the server-side output by calling each function with hard-coded "dummy data" before building client side requests.


## What didn't you get to, or what else might you do with more time?

1. Creating more message styles, and more templates.
2. Injecting new templates into the JSON file.
3. Modifying existing JSON to be more customized, rather than plugging in small pieces and concatenating
JSON object properties with JS variables.
4. Building out a UI.
