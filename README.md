# React Photo Stream
A React-based photo stream viewing app that gets its photos from the 500px API.

## Running the app
Run `npm install`, then `npm run dev` to run the webpack dev server.
Open [localhost:4000](http://localhost:4000) in your browser.




## Areas for further improvement
* Implement a Flux dataflow
* An infinite scroll implementation that removes DOM nodes from the top of the page as the user scrolls
* Ability to let the user select from various photo streams besides just "popular"
* Add persistence of favorited photos between sessions
* Animate favorites counter
* Improve column filling algorithm to place images into columns based on which one has the shortest height