class Event < ApplicationRecord
	has_many :performances
	has_many :reviews
	has_many :votes
	validates :code, presence: true, uniqueness: true

	def upvotes
		self.votes.where(value: 1).count
	end

	def downvotes
		self.votes.where(value: -1).count
	end

	def tally_votes
		self.upvotes() - self.downvotes()
	end

end
