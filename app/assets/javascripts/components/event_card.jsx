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
    <VotesComponent score={e.score} event_id={e.id}/>
    <br/>
    
  </div>
</div>
    );
  }
});
