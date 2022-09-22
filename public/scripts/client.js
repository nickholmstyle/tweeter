//Doc ready
$(() => {

  //Helpers
  const $errorMessage = $('.error-message');
  const $tweetText = $(".new-tweet-form");
  
  //Prevent js from being injected in tweets from the form.
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //This is the tweet element as a template literal with data from server side database.

  const createTweetElement = function(tweetData) {

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
  
  //Calls createTweetElement for each tweet and takes return value and appends it to the tweets container.
  //Renders the tweet in reverse to display most recent tweet at the top.
  const renderTweets = function(tweets) {
  
    const $container = $('.tweets')
    $container.empty();
  
    tweets.reverse().forEach(function(tweet) {
      let tweetElement = createTweetElement(tweet);
      $container.append(tweetElement);
    });
  
  };

  //loads the rendered tweet data to the client.
  const loadTweets = () => {
    return $.ajax('/tweets', { method: 'GET' })
      .then((data) => {
        renderTweets(data);
      });
  };

  //Initial load of tweets.
  loadTweets()
  
  //Tweet submission form. Default event prevented. Message sent to user if conditions were not met.
  
  $tweetText.submit(function(event) {
    event.preventDefault();

    const $data = $(this).serialize();
    const $textValue = $(".form-textarea").val();
    
    if (!$textValue.trim()) {
      errorMessage('Tweet here pretty please!');
      return false;
    }

    if ($textValue.length > 140) {
      errorMessage(`You've exceeded the max of 140!`);
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $data,
      success: function() {
        console.log(`succesful`);
        $(".form-textarea").val('');
        $('.counter').html(140);
      },
      error: function() {
        console.log(`error`)
      }
    }).then(() => {
      return loadTweets()
    })
  });

  //Animates the error message.
  const errorMessage = (message) => {
    $errorMessage.text(message).slideDown('slow');
  };

  //Hides the error message after text is entered or reduced after excceding the limit.
  $tweetText.on('input', () => {
    $errorMessage.slideUp('slow', () => {
      $errorMessage.hide();
    })
  })

});

