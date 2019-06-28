class FriendRequestsController < ApplicationController
  def create
    recipient = User.find_by_email(params[:email])

    return false unless recipient

    FriendRequest.create(
      sender: current_user,
      recipient: recipient
    )
  end

  def update
    if params[:friend_request_action] == "ACCEPT"
      request = FriendRequest.find(params[:id])
      raise unless request.recipient == current_user
      request.accept!
    end
  end
end
