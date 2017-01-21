var VotesComponent = React.createClass({
  getInitialState: function(){
    return{};
  },
  render: function() {
    return (
	<div>
		<h1>Votes</h1>
		<text className="text-info">Score:</text>
		<span className="vote_tally text-info">  </span>
		<br/>
		<div className="btn-group vote_buttons" role="group" aria-label="...">
			<div className="btn-group vote_buttons" role="group" aria-label="...">
				<button type="button" className="btn btn-default thumbsup_button">UP</button>
				<button type="button" className="btn btn-default thumbsdown_button">DOWN</button>
			</div>
		</div>
	</div>
    );
  }
});

module.exports = VotesComponent;