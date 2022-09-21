/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { text } = require("body-parser");
// Fake data taken from initial-tweets.json


$(() => {
  
  //Prevent js from being injected in tweets from the form
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };



  //This is the tweet element
  const createTweetElement = function(tweetData) {


    // const $tweet = $(`<article class="tweet">Hello world</article>`);
    let $tweet = $("<article>").addClass("tweet");



    let html = `
      <header class="tweet-header">
        <img class="tweet-avatar" src="${escape(tweetData.user.avatars)}" alt="">
        <h2 class="tweet-name">${escape(tweetData.user.name)}</h2>
        <small class="tweet-handle">${escape(tweetData.user.handle)}</small>
      </header>
        <div class="tweet-content">
          <p>${escape(tweetData.content.text)}</p>
        </div>
      <footer class="tweet-footer">
        <small class="footer-age">${timeago.format(tweetData.created_at)}</small>
        <span class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>`;
    
    let element = $tweet.append(html)
    return element;
  };
  
  
  //This renders the tweets

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  
      const $container = $('.tweets')
      $container.empty();
  
      tweets.reverse().forEach(function(tweet) {
        let tweetElement = createTweetElement(tweet);
        $container.append(tweetElement);
      });
  
    };

  
  
  // renderTweets(data);

  //Submit tweet

  const $tweetText = $(".new-tweet-form");
  $tweetText.submit(function(event) {
    event.preventDefault();

    const $data = $(this).serialize();
    // const $input = $(".form-textarea")

    const $textValue = $(".form-textarea").val();
    
    if (!$textValue.trim()) {
      errorMessage('*** Input is empty! ***');
      return false;
    }

    if ($textValue.length > 140) {
      errorMessage(`*** You've exceeded the max of 140! ***`);
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $data,
      success: function() {
        console.log(`succesful`)
      },
      error: function() {
        console.log(`error`)
      }
    }).then(() => {
      return loadTweets()
    })
  })

  const loadTweets = () => {
    return $.ajax('/tweets', { method: 'GET' })
      .then((data) => {
        renderTweets(data);
      });
  };
  loadTweets()

  const $errorMessage = $('.error-message')
  
  const errorMessage = (message) => {
    $errorMessage.text(message).slideDown('slow');
  };

  $tweetText.on('input', () => {
    $errorMessage.slideUp('slow', () => {
      $errorMessage.hide();
    })
  })



});

