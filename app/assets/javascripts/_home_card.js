// $(document).on('turbolinks:load', function() {
// 	console.log('document ready')

// 	$('.home_card').each(function(index, card) {
// 		 	var event_id = $(card).first().attr('id')
// 			var thumbsup_button = $(card).find('.thumbsup_button')[0]
// 			var thumbsdown_button = $(card).find('.thumbsdown_button')[0]
// 			var fav_vote = $(card).find('.fav_vote')[0]


// 			$( fav_vote ).click(function(event) {
// 				var button = event.target
// 				// alert('hello')

// 				$.ajax({
// 					url: "/favourites",
// 					type: "POST",
// 					data: {favourite: {
// 						event_id: event_id
// 					}},
// 					success: function(a,b,c){
// 						$(vote_tally).html(a['votes'])
// 						$("#notice").html(a['notice'])
// 					},
// 					error: function() {
// 						console.log('failed')
// 					}
// 				});
// 			});

// 			$( thumbsup_button ).click(function(event) {
// 				var button = event.target
// 				var vote_tally =  $(button).closest('.vote_buttons').siblings('.vote_tally')[0];

// 				$.ajax({
// 					url: "/votes",
// 					type: "POST",
// 					data: {event_id: event_id, value: 1},
// 					success: function(a,b,c){
// 						console.log("a", a, "b",b, "c", c)
// 						$(vote_tally).html(a['votes'])
// 						$("#notice").html(a['notice'])
// 					},
// 					error: function() {
// 						console.log('failed')
// 					}
// 				});
// 			});

// 			$( thumbsdown_button ).click(function(event) {
// 			var button = event.target
// 			var vote_tally =  $(button).closest('.vote_buttons').siblings('.vote_tally')[0];

// 			$.ajax({
// 				url: "/votes",
// 				type: "POST",
// 				data: {event_id: event_id, value: -1},
// 				success: function(a,b,c){
// 					$(vote_tally).html(a['votes'])
// 					$("#notice").html(a['notice'])
// 				},
// 				error: function() {
// 					console.log('failed')
// 				}
// 			});
// 		});
// 	});
// });



















// 	// var current_vote = $('#vote_count').attr("value") 
// 	// console.log( event_id)
// 	// $("#my_id .my_class")

// 	// $('.home_card').find('.thumbsup_button').click(function(event) {
// 	// 	/* Act on the event */
// 	// 	var box1 = (event.target)
// 	// 	var box = box1.siblings();
// 	// 	console.log( box )
// 	// });

// 	// $('.thumbsup_button').click(function(event) {
// 		// $.post('/votes', {event_id: 1, value: 1}, function(data, textStatus, xhr) {
// 		// 	// console.log("data", data);
// 		// });


// 	// });
	

// 	// $('.thumbsdown_button').click(function(event) {
//  //    	var current_vote = parseInt( $( "#vote_count" ).html() )
// 	//     var event_id = $(event.target).attr('value')
// 	// 	$.post('/votes', {event_id: event_id, value: -1}, function(data, textStatus, xhr) {
// 	// 		$( "#vote_count" ).text( current_vote - 1 )
// 	// 	});
// 	// });
// // });