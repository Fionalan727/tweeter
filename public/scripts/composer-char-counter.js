$(document).ready(function() {
    var maxLength = 140;
    $('textarea').on('input', function() {
        var textlen = maxLength - $(this).val().length;

        if (textlen < 0) {
            $('.counter', this.parentElement).text(textlen).addClass("overLimit");
        } else {
            $('.counter', this.parentElement).text(textlen).removeClass("overLimit");
        }
    });
  });