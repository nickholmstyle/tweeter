// $(document).ready(() => {
  
//   const tweetText = $('.new-tweet')
  
//   tweetText.on('input', 'textarea', function() {
//     let inputValue = $(this).val();
//     let counter = 10 - inputValue.length;

//     const characterCountHtml = $(this).siblings('.tweet-footer').children('.char-counter');
//     characterCountHtml.text(140 - inputValue.length);

//     if (counter >= 0) {
//       characterCountHtml.removeClass('red-text');
//     }
//     if (counter < 0) {
//       characterCountHtml.addClass('red-text');
//     }

//   });
// });

$(() => {
  $(".form-textarea"). on("input", onInput);
});

const onInput = function(event) {
  
  let $input = $(this);
  let len = $input.val().length;
  let charsLeft = 10 - len;

  const $form = $input.closest('section');
  const $counter = $form.find('.counter')

  $counter.text(charsLeft);

  if (charsLeft < 0) {
    return $counter.addClass('.red-text');
  }
  $counter.removeClass('.red-text');
}
