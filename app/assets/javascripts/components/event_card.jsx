var EventCard = React.createClass({
  getInitialState: function(){
    return{event: $.parseJSON(this.props.event)};
  },

  render: function() {
  	const e = this.state.event 

    return (
<div className="panel panel-primary home_card text-info" id={this.state.id} >
  <div className="panel-heading">
    <h3 className="panel-title">
      <a href={"events/" + e.id}>{e.title}</a>
    </h3>
  </div>

  <div className="panel-body">
    <dl className="dl-horizontal">
      
      <dt>Venue:</dt>
      <dd>{e.venue}</dd>

      <dt>Artist:</dt>
      <dd>{e.artist}</dd>
      
      <dt>Website:</dt>
      <dd> <a href={e.website}>Link </a> </dd>

      <dt>Festival:</dt>
      <dd> {e.festival} </dd>

    </dl>

    <div dangerouslySetInnerHTML={{__html: e.description}} />
    <br/>
    <text className="text-info">Score:</text>
    <span className="vote_tally text-info"> {e.score} </span>
    <br/>
    <div className="btn-group vote_buttons" role="group" aria-label="...">
      <div className="btn-group vote_buttons" role="group" aria-label="...">
        <button type="button" className="btn btn-default thumbsup_button">UP</button>
        <button type="button" className="btn btn-default thumbsdown_button">DOWN</button>
      </div>
    </div>
  </div>

</div>
    );
  }
});
