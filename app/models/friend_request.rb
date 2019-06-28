class FriendRequest < ApplicationRecord
  # belongs_to :user, :through => :inviting_user
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"

  validates :sender_id, uniqueness: { scope: :recipient_id }

  def accept!
    Friendship.create_reciprocal_for_ids(sender.id, recipient.id)
    destroy!
  end

  # belongs_to :user, :primary_key => "id", :foreign_key => "recipient", :class_name => "User"
  # belongs_to :user, :primary_key => "id", :foreign_key => "sender", :class_name => "User"
end
