class HomeController < ApplicationController
  # GET /
  def welcome
    @events = Event.all.order(score: :desc).page(params[:page]).per(5)

    # scope to only favourited
    # @events_raw = Event.find(current_user.favourites.map(&:event_id))
    # @events = Kaminari.paginate_array(@events_raw).page(params[:page]).per(10)
  end
end
