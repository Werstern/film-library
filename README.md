1.How to run app? 
1.1. Clone repository ("git clone <name repository>");
1.2. Go to the root level of directory with project and install back-end dependencies libraries using command "npm install";
1.3. Go to the client directory client/ using command "cd client" and install front-end dependencies libraries using commned "npm install";
1.4. Go to the root level of project and run back-end side (from client directory from 1.3. go to the root level using command "cd ../")
and use command "npm run start-watch" (running nodemon) or "npm start" (without nodemon); nodemon tool for node to reload app when something
change in files for back-end;
1.5. When back-end is running add new terminal and navigate to client directory (from root level to client directory use command "cd client";
1.6. In client directory run client side using command "npm start";
1.7. After step 1.6. app is ready to use. For client side I use create-react-app (https://github.com/facebook/create-react-app), so it runs
client side automatically in new tab.

2.Project structure:
2.1. Back end running on port 8080 ( http://localhost:8080/ ), client side on port 3000 ( http://localhost:3000/ );
2.2. Working directory for client side is client/ , working directory for back-end is root directory;
2.3. Back-end use MongoDB database to store data (Mlab);
2.4. Back-end has routes for getting information from db, upload new information about new films using form, deleting films from db,
searching films by title,star, import file (extension .txt) with new information about new films. The structure should be like this:
  Title: Blazing Saddles 
  Release Year: 1974
  Format: VHS
  Stars: Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn
2.5. In step 2.4. schema - title is required field, stars is required field, also it possible to add url of image 
(no required filed) - field name is "image".
2.6. Initial data for this project (image url, title, release year, stars), and disign I used from https://www.themoviedb.org/
2.7. On server side I use NodeJs with framework Express.
2.8. On client side I use React without Router(another way to make architecture of app), without Redux because App is small and
state manager is no important here (Reat logic is more than enough for this App), no lazy loading components (App is small), axios form
making AJAX request to beck-end, webpack, ES6, babel. In React I use class containers and functional components, also custom Higher-Order Components and another supplementary tools.
2.9. The App is responsive, use flex in css, and have mobile React version - min width 360px. For styling app I use css modules.
