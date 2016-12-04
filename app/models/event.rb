class Event < ApplicationRecord
	has_many :performances
	has_many :reviews
	has_many :votes
	belongs_to :venue 
	validates :code, presence: true, uniqueness: true

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

end
