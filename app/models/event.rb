class Event < ApplicationRecord
	has_many :performances
	has_many :reviews
	has_many :votes
	has_many :favourites
	belongs_to :venue 
	validates :code, presence: true, uniqueness: true
	acts_as_commontable

	def upvotes
		self.votes.where(value: 1).count
	end

	def downvotes
		self.votes.where(value: -1).count
	end

	def tally_votes
		self.score = self.upvotes() - self.downvotes()
		self.save
		return self.score
	end

	def has_been_favourited?(user)
		self.favourites.exists?(user_id: user.id, event_id: self.id)
	end

end
