/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


$(() => {
  

//This is the tweet element
  const createTweetElement = function(tweetData) {


    // const $tweet = $(`<article class="tweet">Hello world</article>`);
    let $tweet = $("<article>").addClass("tweet");



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
  
      tweets.forEach(function(tweet) {
        let tweetElement = createTweetElement(tweet);
        $container.append(tweetElement);
      });
  
    };

  
  
  // renderTweets(data);

  //Submit tweet
  $(".new-tweet-form").submit(function(event) {
    event.preventDefault();

    const $data = $(this).serialize();
    // const $input = $(".form-textarea")

    const $textValue = $(".form-textarea").val();
    
    if (!$textValue.trim()) {
      window.alert('Input is empty');
      return false;
    }

    if ($textValue.length > 140) {
      window.alert(`You've exceed the max input`);
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
    })
  })

  const loadTweets = () => {
    return $.ajax('/tweets', { method: 'GET' })
      .then((data) => {
        renderTweets(data);
      });
  };
  loadTweets()



});

