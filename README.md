# github-cards
Simple github cards to showcase your work

# Usage
Import `src/css/github-cards.css` and `src/js/github-cards.js`

Fetch repositories with the function `fetchRepositories(user, callback)` : 
- `user` is the Github user as a string
- `callback` is a function taking an array of HTML elements as arguments

## Example : 
```js
fetchRepositories("Peyphour", function(cards) {
  for(card of cards) {
    document.getElementById("container").appendChild(card);
  }
});
```
