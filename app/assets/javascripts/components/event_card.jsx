// Entry point to React
var EventCard = React.createClass({
  getInitialState: function() {
    return { event: $.parseJSON(this.props.event) };
  },

  signed_in: function(e, v) {
    if (this.props.user_signed_in) {
      return (
        <div className="btn-toolbar" role="toolbar">
          <VotesComponent score={e.score} event_id={e.id} />
          <UserEventStatus event_id={e.id} />
        </div>
      );
    } else {
      return (
        <div className="btn-toolbar" role="toolbar">
          <VotesComponent score={e.score} event_id={e.id} />
          <a href="/users/sign_in" type="button" className="btn btn-default">
            Sign In To Vote
          </a>
        </div>
      );
    }
  },

  render: function() {
    $('[data-toggle="tooltip"]').tooltip();
    const e = this.state.event;
    const v = $.parseJSON(this.props.venue);
    return (
      <div
        className="panel panel-primary home_card text-info"
        id={this.state.id}
      >
        <div className="panel-heading">
          <h3 className="panel-title">
            <a href={"events/" + e.id}>{e.title}</a>
          </h3>
        </div>

        <div className="panel-body">
          <dl className="dl-horizontal">

            <dt>Venue:</dt>
            <dd>{v.name}</dd>

            <dt>Artist:</dt>
            <dd>{e.artist}</dd>

            <dt>Website:</dt>
            <dd> <a href={e.website}>Link </a> </dd>

            <dt>Festival:</dt>
            <dd> {e.festival} </dd>

          </dl>

          <div dangerouslySetInnerHTML={{ __html: e.description }} />

          {this.signed_in(e, v)}

        </div>
      </div>
    );
  }
});