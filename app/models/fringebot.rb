require 'festivals_lab'
# api.events # The first page of events (using the API's default of 25 per page)

# puts api.events(festival: 'book', size: 50, from: 100)
# puts api.events(festival: 'fringe', post_code: 'EH1', price_to: 5)
# puts api.events(title: "'Dino Day'").count

class Fringebot
  FESTIVALS = ["all", "fringe", "demofringe", "jazz", "book", "international", "tattoo", "art", "hogmanay", "science", "imaginate", "film", "mela", "storytelling"]
  YEARS = ["2015", "2016", "2017"]

  def initialize(my_hash)
    @params = my_hash
    @api = FestivalsLab.new(
      ENV["FRINGE_API_KEY"],
      ENV["FRINGE_SECRET_KEY"]
    )
  end

  def single_event()
    params = @api.event(@params["uuid"])
    event = find_or_create_venue_and_event(params)
  end

  def query_api
    @api.events(
      title: @params["title_string"],
      festival: @params["festival_string"],
      year: @params["year"],
      artist: @params["artist"],
      code: @params["code"]
      )
  end

  def get_events
    api_response = query_api()
    events = Array.new()
    api_response.each do |params|
      events << find_or_create_venue_and_event(params)
    end
    return events
  end

  def find_or_create_venue_and_event(params)
      # Venue
      venue = create_or_find_venue(params)

      # Event
      event = create_or_find_event(params)

      # Assign Venue to event if not already assigned
      event.update_attributes!(venue: venue)

      # Performances
      # performances = create_or_find_performances(params)
      return event
  end

  def create_or_find_performances(params)
    # I'm ignoring performances for the time 
    # being. I think these should be an
    # on demand request?
  end

  def create_or_find_venue(params)
    params = create_venue_params(params)
    venue = Venue.find_by_code(params["code"])
    if venue.present?
      update(venue, params)
    else
      venue = Venue.create!(params)
    end
    return venue
  end

  def update(thing, new_params)
    # Thing can be Event or Venue or Peformance
    # Check if the API has updated the thing since the last time the app has updated the thing 
    # return if thing.updated.to_datetime < thing.updated_at
    thing.update_attributes(new_params)
    return thing
  end

  def create_or_find_event(params)
    params = create_event_params(params)
    event = Event.find_by_code(params["code"])
    if event.present?
      update(event, params)
    else
      event = Event.create!(params)
    end
    
    event.update_attributes!(festival_year: @params["year"])
    return event
  end

  def create_event_params(result)
    return result.slice("age_category", "artist", "code", "description", "festival", "festival_id", "genre", "latitude", "longitude", "status", "title", "updated", "url", "website", "score")
  end

  def create_venue_params(result)
    result = result["venue"]
    return result.slice("address", "box_office_fringe", "box_office_opening", "cafe_description", "code", "email", "fax", "has_bar", "has_booking_over_card", "has_booking_over_phone", "has_booking_over_web", "has_cafe", "name", "phone", "lat", "lon", "post_code", "web_address")
  end

  def create_performances_params_array(result)
    @raw_array = result["performances"]
    @performance_hashes = @raw_array.each{|hash| hash.slice("concession", "end", "start", "price")
      hash[:end_time] = hash.delete(:end)
      hash[:start_time] = hash.delete(:start)
    }
    return @performance_hashes
  end
end

# "performances"=>
#    [{"concession"=>8,
#      "end"=>"2017-06-02 11:30:00",
#      "price"=>12,
#      "start"=>"2017-06-02 10:30:00"},
#     {"concession"=>8,
#      "end"=>"2017-06-03 14:30:00",
#      "price"=>12,
#      "start"=>"2017-06-03 13:30:00"},
#     {"concession"=>8,
#      "end"=>"2017-06-03 18:00:00",
#      "price"=>12,
#      "start"=>"2017-06-03 17:00:00"},
#     {"concession"=>8,
#      "end"=>"2017-06-04 14:30:00",
#      "price"=>12,
#      "start"=>"2017-06-04 13:30:00"}],


# {"age_category"=>"Ages 8+",
#   "artist"=>nil,
#   "code"=>"832",
#   "description"=>"<p>Returning after sell-out success at Science Festival 2016,
#   this hands-on workshop for all artistic abilities brings the worlds of science and art together. Photography is one of the best examples of where science and art merge and this workshop with <strong>Dr Kathryn Harkup</strong> will teach you how to paint,
#   sketch and doodle with light to create beautiful images,
#   using long exposure photography and a bit of science along the way.</p>",
#   "festival"=>"Edinburgh International Science Festival",
#   "festival_id"=>"science",
#   "genre"=>"Workshop",
#   "latitude"=>55.9478,
#   "longitude"=>-3.18767,
#   "performances"=>[{"concession"=>nil,
#     "end"=>"2017-04-12 12:00:00",
#     "price"=>10,
#     "start"=>"2017-04-12 11:00:00"},
#     {"concession"=>nil,
#       "end"=>"2017-04-12 15:00:00",
#       "price"=>10,
#       "start"=>"2017-04-12 14:00:00"}],
#       "status"=>"active",
#       "title"=>"Light Drawing",
#       "updated"=>"2017-03-15 13:10:39",
#       "url"=>"http://api.edinburghfestivalcity.com/events/3c934b8ab92a6e1c5afeea7e27178198795bd3c6",
#       "venue"=>{"address"=>"Chambers Street
#         +Edinburgh",
#         "code"=>"National Museum of Scotland",
#         "description"=>nil,
#         "name"=>"National Museum of Scotland",
#         "phone"=>nil,
#         "post_code"=>"EH1 1JF"},
#         "website"=>"http://www.sciencefestival.co.uk/event-details/light-drawing"}
