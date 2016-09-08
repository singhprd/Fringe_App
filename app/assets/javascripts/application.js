// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {
	// var current_vote = $('#vote_count').attr("value") 
	// console.log( event_id)
    
	$('.thumbsup_button').click(function(event) {
    	var current_vote = parseInt( $( "#vote_count" ).html() )
	    var event_id = $(event.target).attr('value')
		$.post('/votes', {event_id: event_id, value: 1}, function(data, textStatus, xhr) {
			$( "#vote_count" ).text( current_vote + 1 )
		});
	});
	

	$('.thumbsdown_button').click(function(event) {
    	var current_vote = parseInt( $( "#vote_count" ).html() )
	    var event_id = $(event.target).attr('value')
		$.post('/votes', {event_id: event_id, value: -1}, function(data, textStatus, xhr) {
			$( "#vote_count" ).text( current_vote - 1 )
		});
	});
});