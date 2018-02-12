class Comment < ApplicationRecord
	belongs_to :user
	belongs_to :event
	has_many :comment_votes, :dependent => :destroy

	validates :event, presence: true
	validates :user, presence: true
	validates :text, presence: true

	def votes
		CommentVote.where(comment_id: self.id).map(&:vote).sum
	end

	def user_vote(current_user)
		self.comment_votes.where(user_id: current_user).last&.vote || 0
	end

	def as_json(options={})
		super(:methods =>[:votes], :include => {:user => {only: :username}})
	end

	def comment_json_with_user_vote(current_user)
		self.as_json.merge({"user_vote": user_vote(current_user)})
	end
end
