// Doc ready, experimenting with some refactoring.
$(() => {
  $(".form-textarea"). on("input", onInput);
});

//Implementing the counter function when user inputs data using the keyboard to display the characters left.
//Turns red when the user has exceeded 140.
const onInput = function(event) {
  
  let $input = $(this);
  let len = $input.val().length;
  let charsLeft = 140 - len;

  const $form = $input.closest('section');
  const $counter = $form.find('.counter');

  $counter.text(charsLeft);

  if (charsLeft < 0) {
    return $counter.addClass('red-text');
  }
  $counter.removeClass('red-text');
}
