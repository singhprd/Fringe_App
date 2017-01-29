// event_id = this.props.event_id
var UserEventStatus = React.createClass({
  getInitialState: function(){
    return{};
  },

  is_favourited: function(){
    var that = this
    $.ajax({
      url: "/events/" + this.props.event_id + "/is_favourited",
      type: "GET",
      data: {event_id: this.props.event_id},
      success: function(a,b,c){
        console.log("a", a, "b",b, "c", c)
        // votes = a['votes']
        // if (votes) {
          // this.setState({score: a['votes']})
        // }
        // $("#notice").html(a['notice'])
      }.bind(this),
      error: function() {
        console.log('failed')
      }
    });
  },

  render_appropriate_buttons: function(){
    const bool = this.is_favourited()
    return <button onClick={this.upvote} className="btn btn-default">❤️️</button>
  },

  render: function() {
  	
    return (
<div>
  {this.render_appropriate_buttons()}
</div>
    );
  }
});
