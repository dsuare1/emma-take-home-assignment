# Derrick Suarez - Emma Sr. Software Engineer Role
## Take Home Assignment

### To run the app:
1. Clone the repository from github.com/dsuare1/emma-take-home-assignment
2. From the command line, navigate to the directory and run:
   1. $ npm run start

### To run the test suite:
1. Navigate to the directory on the command line and run:
   1. $ npm run test

### To build for production:
1. Navigate to the directory on the command line and run:
   1. $ npm run build

### Tools used to build this app:
1. create-react-app to bootstrap the project
2. Ant Design Component Library (https://ant.design/)
3. Redux global state manager (with hooks useSelector and useDispatch)
4. React Hooks (useEffect, useState)
5. localStorage for persisting favorites (per browser)

----
### Things I would add in the future:
1. 404 page
   1. if the user gets "stuck" in the app somewhere by accident, we need to give them a way out; either back, or back home
2. implement comment viewing on ResultCards
   1. allow the user to click the comments icon on a Gist card to view the comments for that gist; would either use a modal or a drawer
3. filtering in the favorites section
   1. give the user a select dropdown with options to filter favorited gists by particular user (or users, for multi-filters)
4. date range capability when searching
   1. allow the user to set date boundaries when searching for gists by a user (or public gists)
   2. not sure if the GitHub Gists api supports this (query params?), so this would possibly have to be achieved using a date comparison helper in the client, and comparing the user's selected date boundaries with the 'created_at' dates for the gists
5. the ability for a user to authenticate to GitHub and:
   1. create Gists straight from the app
   2. comment on Gists straight from the app
6. allow users to follow creators and implement a polling mechanism to periodically check for new, or updated, gists by those "followed" creators
7. allow users to pin favorited gists, for even easier access
8. allow users to tag favorited gists and filter by those tags (tags for language, technology, concept, stack scope [frontend, backend, db, etc.,], etc.)
