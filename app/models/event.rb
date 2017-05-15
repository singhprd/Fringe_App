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

  def update
    @fringebot = Fringebot.new()
    @event = @fringebot.get_single_event
  end

# TODO Add year to event and scope search.
  # def self.year(year)
  #   Event.where(year)
  # end
end
