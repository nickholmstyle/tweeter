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
    console.log(`i got here`)
    return $counter.addClass('red-text');
  }
  $counter.removeClass('red-text');
}
