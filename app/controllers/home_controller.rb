class HomeController < ApplicationController
  # TODO: Add Scopes

  # GET /
  def welcome
    @filter = params
    if params[:year].nil? && params[:favourites].nil?
      redirect_to '/?favourites=false&year=2017'
    end
  	year = params[:year]
    @events = Event.where(festival_year: year).order(score: :desc).page(params[:page]).per(5)
    if params[:favourites] == "true" && current_user.nil?
      render 'common/sign_in_to'
    elsif params[:favourites] == "true"
      @events_raw = Event.order(score: :desc).find( current_user.favourites.map(&:event_id) )
      @events = Kaminari.paginate_array(@events_raw).page(params[:page]).per(5)
    end
  end
end
