var VotesComponent = React.createClass({
  getInitialState: function(){
    return{score: this.props.score };
  },
  upvote: function(){
  	var that = this
	$.ajax({
		url: "/votes",
		type: "POST",
		data: {event_id: this.props.event_id, value: 1},
		success: function(a,b,c){
			// console.log("a", a, "b",b, "c", c)
			votes = a['votes']
			if (votes) {
				this.setState({score: a['votes']})
			}
			$("#notice").html(a['notice'])
		}.bind(this),
		error: function() {
			console.log('failed')
		}
	});
  },
  downvote: function(){
  	var that = this
	$.ajax({
		url: "/votes",
		type: "POST",
		data: {event_id: this.props.event_id, value: -1},
		success: function(a,b,c){
			// console.log("a", a, "b",b, "c", c)
			votes = a['votes']
			if (votes) {
				this.setState({score: a['votes']})
			}
			$("#notice").html(a['notice'])
		}.bind(this),
		error: function() {
			console.log('failed')
		}
	});
  },
  render: function() {
    return (
	<div>
		<text className="text-info">Score:</text>
		<span className="vote_tally text-info">{this.state.score}</span>
		<br/>
		<div className="btn-group vote_buttons" role="group" aria-label="...">
			<div className="btn-group vote_buttons" role="group" aria-label="...">
				<button onClick={this.upvote} className="btn btn-default">👍</button>
				<button onClick={this.downvote} className="btn btn-default">👎</button>
			</div>
		</div>
	</div>
    );
  }
});

// module.exports = VotesComponent;