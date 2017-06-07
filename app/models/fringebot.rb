require "festivals_lab"
# api.events # The first page of events (using the API's default of 25 per page)

# puts api.events(festival: 'book', size: 50, from: 100)
# puts api.events(festival: 'fringe', post_code: 'EH1', price_to: 5)
# puts api.events(title: "'Dino Day'").count

class Fringebot
  FESTIVALS = %w[ all fringe demofringe
                  jazz book international tattoo
                  art hogmanay science imaginate film
                  mela storytelling ].freeze
  YEARS = %w[2015 2016 2017].freeze

  def initialize(my_hash)
    @params = my_hash
    @api = FestivalsLab.new(
      ENV["FRINGE_API_KEY"],
      ENV["FRINGE_SECRET_KEY"]
    )
  end

  def single_event
    params = @api.event(@params["uuid"])
    find_or_create_venue_and_event(params)
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
    api_response = query_api
    events = []
    api_response.each do |params|
      events << find_or_create_venue_and_event(params)
    end
    events
  end

  def find_or_create_venue_and_event(params)
    # Venue
    venue = create_or_find_venue(params)

    # Event
    event = create_or_find_event(params)

    # Assign Venue to event if not already assigned
    event.update_attributes!(venue: venue)

    event
  end

  def performances(event_id)
    params = @api.event(@params["uuid"])
    perf_params = create_performances_params_array(params)
    performances = []

    perf_params.each do |perf_param|
      performance = Performance.create(perf_param)
      performance.update_attributes(event_id: event_id)
      performances << performance
    end

    return performances
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
    # Check if the API has updated the thing since
    # the last time the app has updated the thing
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
    result.slice(
      "age_category",
      "artist",
      "code",
      "description",
      "festival",
      "festival_id",
      "genre",
      "latitude",
      "longitude",
      "status",
      "title",
      "updated",
      "url",
      "website",
      "score"
    )
  end

  def create_venue_params(result)
    result = result["venue"]
    result.slice(
      "address",
      "box_office_fringe",
      "box_office_opening",
      "cafe_description",
      "code",
      "email",
      "fax",
      "has_bar",
      "has_booking_over_card",
      "has_booking_over_phone",
      "has_booking_over_web",
      "has_cafe",
      "name",
      "phone",
      "lat",
      "lon",
      "post_code",
      "web_address"
    )
  end

  def create_performances_params_array(result)
    @raw_array = result["performances"]
    @performance_hashes = @raw_array.each do |perf_hash|
      perf_hash.slice("concession", "end", "start", "price")
      perf_hash[:end_time] = perf_hash.delete("end")
      perf_hash[:start_time] = perf_hash.delete("start")
    end
    @performance_hashes
  end
end
