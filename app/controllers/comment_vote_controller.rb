class CommentVoteController < ApplicationController
	def create

		duplicate = CommentVote.where(user: current_user, comment_id: comment_vote_params[:comment_id])
		if !duplicate.empty?
			duplicate.destroy_all
			render json: {"valid" => "true"}, status: 200
		else
			vote = CommentVote.new(comment_vote_params)
			vote.user = current_user
			vote.save!
			render json: {"valid" => "true"}, status: 200
		end
	end

	# Never trust parameters from the scary internet, only allow the white list through.
    def comment_vote_params
      params.permit(:comment_id, :vote)
      # params.fetch(:comment, {})
    end
end
