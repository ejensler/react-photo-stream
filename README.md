# React Photo Stream
A React-based photo stream viewing app that gets its photos from the [500px API](https://github.com/500px/api-documentation).

## Running the app
Run `npm install`, then `npm run dev` to run the webpack dev server.
Open [localhost:4000](http://localhost:4000) in your browser.

You will need an API consumer key to access the 500px API. A consumer key can be obtained by signing up for a 500px account and registering an app. Once obtained, you will need an to place an `oauth-consumer-config.js` in the root folder in order to run the app. This should look like the following:
```
export default {
  consumer_key: '[some random string of characters]',
};
```

## Areas for further improvement
* Implement a Flux dataflow
* An infinite scroll implementation that removes DOM nodes from the top of the page as the user scrolls
* Ability to let the user select from various photo streams besides just "popular"
* Add persistence of favorited photos between sessions
* Animate favorites counter
* Improve column filling algorithm to place images into columns based on which one has the shortest height