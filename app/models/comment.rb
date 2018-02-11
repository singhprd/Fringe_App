class Comment < ApplicationRecord
	belongs_to :user
	belongs_to :event

	validates :event, presence: true
	validates :user, presence: true
	validates :text, presence: true

	def votes
		CommentVote.where(comment_id: self.id).map(&:vote).sum
	end

	def current_user_comment_vote
		return nil if !defined?(current_user)
		return CommentVote.where(user_id: current_user.id)
	end

	def as_json(options={})
		super(:methods =>[:votes], :include => {:user => {only: :username}})
	end
end
