class HomeController < ApplicationController
  # TODO: Add Scopes

  # GET /
  def welcome
    params[:favourites] ||= "false"
    params[:year] ||= "2017"
    @filter = params
    @events = Event.where(festival_year: params[:year])
                   .order(score: :desc)
                   .page(params[:page]).per(5)
    if params[:favourites] == "true" && current_user.nil?
      render "common/sign_in_to"
    elsif params[:favourites] == "true"
      @events_raw = @events.select do |e|
        Event.favourited?(current_user, e.id)
      end
      @events = Kaminari.paginate_array(@events_raw)
                        .page(params[:page])
                        .per(5)
    end
  end
end
