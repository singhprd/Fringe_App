class HomeController < ApplicationController
  # TODO: Add Scopes

  # GET /
  def welcome
  	year = params[:year]
    @events = Event.where(festival_year: year).order(score: :desc).page(params[:page]).per(5)
    if params[:favourites] == "true"
      @events_raw = Event.order(score: :desc).find( current_user.favourites.map(&:event_id) )
      @events = Kaminari.paginate_array(@events_raw).page(params[:page]).per(5)
    end
  end
end
