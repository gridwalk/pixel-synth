# Net Art Starter
A starter project for net art websites. Designed to speed up workflow without forcing you to use any frameworks. Made with NodeJS and Gulp task runner.

## Features:
- LiveReload so all changes immediately appear in the browser
- CSS preprocessing using Sass
- Sass error notifications
- CSS autoprefixer to help with browser support
- JavaScript error notifications
- All JavaScript files are minified into a single JS file
- Simple automatic local server instance
- Meta tags to make the project look nice on social media
- JavaScript helper functions for randomization and chance

## Getting Started

The documentation is meant for beginner level technologists. If anything is unclear you can file an issue and I'll add more information. 

Follow these steps to get the project up and running:

1. Install nodeJS. https://nodejs.org/en/download/
2. Clone or download this project.
3. Open your terminal or command line, and navigate to this project folder. If you have never used the command line, you can get familiar with it:
 - Mac https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855
 - Windows https://www.computerhope.com/issues/chusedos.htm
4. When you are in the folder run the command: `npm install`. This installs all the project dependencies.
5. When that finishes, you can run the command: `gulp`. This is the task runner that watches the files and compiles the website as you build it.
6. The compiled site appears in the `dist` folder, and you will build the site in the `src` folder. There are already some files in the `src` folder:
 - `html`: All html files in this folder get copied to the the `dist` folder.
 - `img`: All images in this folder get copied to `dist/img`.
 - `js`: Any JS you write goes in the `app` folder. Any JS you need as a dependecy for your project (Like jQuery, ThreeJS etc) goes in the `vendor` folder. All the scripts get combined into one big JS file, with the vendor scripts before the app scripts.
 - `scss`: Write your css in `style.scss`, and you can also create and import other css/scss files. `reset.css` is included to clear out all the default styles from different browsers so you can start from scratch.
 
Once the site is done, make sure to update the content of the meta Open Graph tags and replace img/poster.png with your own image so your site looks nice on social media.

## How Does This Work?

All the compiling, processing and watching is done using Gulp, with tasks defined in gulpfile.js. Gulp is invoked via the command line, and when you run it you'll see a log of every task that executes.

## Projects Made Using This

Send me your project and I will add it to this list.

- https://tracer-float.donaldhanson.net/
