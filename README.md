# bulletin-board-api

This is a RESTful API for a bulletin board application, built using Node.js and Express.

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

This API provides functionality for creating, reading, updating, and deleting posts on a bulletin board. It also includes user registration and login functionality.

## Prerequisites

Before you get started, make sure you have the following software installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) 

## Installing

1. Clone this repository to your local machine:

2. Change into the project's directory:

3. Install the required dependencies:

## Running the Server

To start the server, run the following command:


By default, the server runs on port 5000. You can change this in the `server.js` file.

## API Endpoints

- **Register a New User:** 
  - Endpoint: `POST /api/auth/register`
  - Description: Register a new user by providing a username, password, and email. Passwords are securely hashed before storage.

- **User Login:**
  - Endpoint: `POST /api/auth/login`
  - Description: Authenticate a registered user by providing their email and password. A token is provided for accessing protected routes.

- **Create a New Post:** 
  - Endpoint: `POST /api/posts/createPost`
  - Description: Create a new post by providing the user ID, title, creator's name, date, location, and description.

- **Retrieve All Posts:** 
  - Endpoint: `GET /api/posts/getPosts`
  - Description: Get a list of all posts in the bulletin board.

- **Update a Post:** 
  - Endpoint: `PUT /api/posts/update/:postId`
  - Description: Update an existing post by providing the post's ID and the updated data.

- **Delete a Post:** 
  - Endpoint: `DELETE /api/posts/delete/:postId`
  - Description: Delete a post by specifying the post's ID.

For detailed instructions on how to use these endpoints, refer to the project's API documentation.

## Contributing
We welcome contributions! If you'd like to contribute to this project, please follow these guidelines:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes.
- Test your changes.
- Create a pull request with a clear description of your changes.

## Contact
If you have any questions or feedback, feel free to contact us:
- Email: yocheved181@gmail.com

We appreciate your interest in this project.
