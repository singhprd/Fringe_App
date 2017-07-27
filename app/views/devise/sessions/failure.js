if( $('#failure_message').length ) {
  var message = '';
  console.log($('#failure_message').data('attempts'));
  switch($('#failure_message').data('attempts')) {
      case 1:
          message = 'Try again.';
          break;
      case 5:
          message = 'Really? Come on now.';
          break;
      case 8:
          message = 'Oh, wow.';
          break;
      case 15:
          message = 'I think you should try Lastpass.';
          $('#failure_message').data('attempts', 1);
          break;
      default:
          var attempts = $('#failure_message').data('attempts');
          message = 'Try again' + '.'.repeat(attempts);
  }
  $('#failure_message').text(message);
  $('#failure_message').data()['attempts'] += 1;
} else {
  $('#new_user').append('<div id="failure_message" class="alert alert-danger" role="alert" data-attempts="1">Try again</div>');
}
