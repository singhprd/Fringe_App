// event_id = this.props.event_id
var UserEventStatus = React.createClass({
  getInitialState: function(){
    return{is_favourited: this.is_favourited()};
  },

  is_favourited: function(){
    var that = this
    $.ajax({
      url: "/events/" + this.props.event_id + "/is_favourited",
      type: "GET",
      data: {event_id: this.props.event_id},
      success: function(a,b,c){
        this.setState({is_favourited: a.bool})
        // $("#notice").html(a['notice'])
      }.bind(this),
      error: function() {
        console.log('failed is_favourited user_event_status.jsx')
      }
    });
  },

  favourite: function(){
    console.log("Faved")
    // Keen Bean Loading
    this.setState({is_favourited: true})
    var that = this
    $.ajax({
      url: "/favourites",
      type: "POST",
      data: {favourite: {event_id: this.props.event_id}},
      success: function(a,b,c){
        this.is_favourited()
      }.bind(this),
      error: function() {
        console.log('failed favourite user_event_status.jsx')
      }
    });
  },

  unfavourite: function(){
    console.log("Un-Faved")
    // Keen Bean Loading
    this.setState({is_favourited: false})
    var that = this
    $.ajax({
      url: "/favourites/" + this.props.event_id,
      type: "DELETE",
      data: {favourite: {event_id: this.props.event_id}},
      success: function(a,b,c){
        console.log(a,b,c)
        this.is_favourited()
      }.bind(this),
      error: function() {
        console.log('failed unfavourite user_event_status.jsx')
      }
    });
  },

  render_appropriate_buttons: function(){
    if (this.state.is_favourited) {
      return <button onClick={this.unfavourite} className="btn btn-default active">❤️️</button>
    } else {
      return <button onClick={this.favourite} className="btn btn-default">❤️️</button>
    }
  },

  render: function() {
    return (
      <div className="btn-group" role="group">
        {this.render_appropriate_buttons()}
      </div>
      );
  }
});
