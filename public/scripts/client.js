/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


$(() => {
  

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

    const $container = $('.tweets')
    $container.empty();

    tweets.forEach(function(tweet) {
      let tweetElement = createTweetElement(tweet);
      $container.append(tweetElement);
    });

  };

  const createTweetElement = function(tweetData) {


    // const $tweet = $(`<article class="tweet">Hello world</article>`);
    let $tweet = $("<article>").addClass("tweet");

    // let postDate = tweetData.created_at;
    // let tweetAge = moment(postDate).fromNow();


    let html = `
      <header class="tweet-header">
        <img class="tweet-avatar" src="${tweetData.user.avatars}" alt="">
        <h2 class="tweet-name">${tweetData.user.name}</h2>
        <small class="tweet-handle">${tweetData.user.handle}</small>
      </header>
        <div class="tweet-content">
          <p>${(tweetData.content.text)}</p>
        </div>
      <footer class="tweet-footer">
        <small class="footer-age">${tweetData.created_at}</small>
        <span class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>`;
    
    let element = $tweet.append(html)
    return element;
  };
  renderTweets(data);

});