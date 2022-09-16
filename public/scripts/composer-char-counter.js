$(document).ready(() => {
  
  const tweetText = $('.new-tweet')
  
  tweetText.on('input', 'textarea', function() {
    let inputValue = $(this).val();
    let counter = 140 - inputValue.length;

    const characterCountHtml = $(this).siblings('.tweet-footer').children('.char-counter');
    characterCountHtml.text(140 - inputValue.length);

    if (counter >= 0) {
      characterCountHtml.removeClass('red-text');
    }
    if (counter < 0) {
      characterCountHtml.addClass('red-text');
    }

  });
});