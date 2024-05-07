## Readme of 0x00-Webpack
---

Setting up a development server with webpack:

We've explored the process of setting up a development environment with webpack, a powerful tool for bundling and serving web applications. Our journey begins with the installation of Node.js, ensuring compatibility with Ubuntu 18.04 LTS. Node.js provides the runtime environment necessary for executing JavaScript code on our system.

Next, we initialize a new project directory and create a `package.json` file to manage our project dependencies and configuration. With Node.js and npm (Node Package Manager) in place, we install webpack and webpack-cli as development dependencies. These tools enable us to bundle our JavaScript files and manage our webpack configuration from the command line.

To enhance our development workflow, we incorporate webpack-dev-server, a development server that enables real-time updates and hot module replacement. This tool allows us to preview our web application as we make changes, eliminating the need for manual refreshing of the browser.

Our webpack configuration file (`webpack.config.js`) serves as the heart of our setup, defining entry points, output paths, and configuring the development server. We specify the entry point for our application, the output directory for bundled files, and settings for the development server, such as the port number and content base.

In our source directory (`src`), we create an entry JavaScript file (`index.js`) where our application logic resides. Additionally, we create an HTML file (`index.html`) in the `dist` directory, which serves as the entry point for our web application. This HTML file includes a reference to our bundled JavaScript file.

Finally, we add a start script to our `package.json`, enabling us to start the webpack-dev-server with a single command. This script launches the development server, opens a new browser window, and serves our web application from the specified port.

---

