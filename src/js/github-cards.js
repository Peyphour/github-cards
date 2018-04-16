function createCard(repo) {

  const CARD_HTML = '<div class="github-card">' +
                      '<div class="header">' +
                        '<img src="AVATAR_URL"/><strong class="name"><a href="REPO_URL">REPO_NAME</a><sup>REPO_LANGUAGE</sup></strong>' +
                        '<span>CREATED_OR_FORKED by <a href="OWNER_URL">OWNER_NAME</a></span>' +
                      '</div>' +
                      '<div class="content">' +
                        '<p>REPO_DESCRIPTION</p>' +
                      '</div>' +
                      '<div class="footer">' +
                        '<span class="status">' +
                         '<strong>REPO_FORKS</strong> FORKS' +
                        '</span>' +
                        '<span class="status">' +
                          '<strong>REPO_STARS</strong> STARS' +
                        '</span>' +
                      '</div>' +
                    '</div>';

  let html = CARD_HTML
    .replace("AVATAR_URL", repo.owner.avatar_url)
    .replace("REPO_NAME", repo.name)
    .replace("REPO_LANGUAGE", repo.language)
    .replace("REPO_URL", repo.html_url)
    .replace("CREATED_OR_FORKED", repo.fork ? 'Forked' : 'Created')
    .replace("OWNER_URL", repo.owner.html_url)
    .replace("OWNER_NAME", repo.owner.login)
    .replace("REPO_DESCRIPTION", repo.description ? repo.description : 'No description')
    .replace("REPO_FORKS", repo.forks_count)
    .replace("REPO_STARS", repo.stargazers_count)

  let div = document.createElement("div");
  div.innerHTML = html.trim();

  return div.firstChild;
}

function handleResponse(data) {
  let cards = [];
  data = data.sort(function(a, b) {a = new Date(a.updated_at);b = new Date(b.updated_at); return (a < b) - (a > b);}); 
  for(let repo of data) {
    cards.push(createCard(repo))
  }
  return cards;
}

function fetchRepositories(user, callback) {
  fetch("https://api.github.com/users/" + user + "/repos?per_page=500")
    .then(response => response.json())
    .then(body => handleResponse(body))
    .then(cards => callback(cards))
}

function fetchRepository(repo, callback) {
  fetch("https://api.github.com/repos/" + repo)
	.then(response => response.json())
	.then(body => createCard(body))
	.then(card => callback(card))
}
