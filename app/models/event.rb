class Event < ApplicationRecord
  has_many :performances
  has_many :reviews
  has_many :votes
  has_many :favourites
  belongs_to :venue
  validates :code, presence: true, uniqueness: true
  acts_as_commontable

  def upvotes
    votes.where(value: 1).count
  end

  def downvotes
    votes.where(value: -1).count
  end

  def tally_votes
    self.score = upvotes - downvotes
    save
    score
  end
  
  def self.favourited?(user, event_id)
    return false if user.nil? || event_id.nil?
    Event.find(event_id).favourites.exists?(
      user_id: user.id, event_id: event_id
    )
  end

  def uuid
    self.url.split("/").last
  end

  def to_fringebot_hash
    {
      title: self.title,
      festival: self.festival,
      year: self.festival_year,
      artist: self.artist,
      code: self.code
    }
  end

  def performances_json
    if self.performances_last_updated&.to_datetime.to_i > 1.hour.ago.to_i
      return self.performances.to_json
    else
      self.performances.destroy_all
      self.update_attributes(performances_last_updated: DateTime.now)
      fringebot = Fringebot.new("uuid" => self.uuid)
      performances = fringebot.performances(self.id)
      return performances
    end
  end

  def check_for_updates
    # TODO ADD CHECK TO RETURN IF CHECKED IN LAST X HOURS
    return if self.last_checked_for_update&.to_datetime.to_i > 1.hour.ago.to_i
    self.update_attributes(last_checked_for_update: DateTime.now)
    # return if self.last_checked_for_update 
    fringebot = Fringebot.new("uuid" => self.uuid)
    fringebot.single_event
  end

# TODO Add year to event and scope search.
  # def self.year(year)
  #   Event.where(year)
  # end
end
