# frozen_string_literal: true

class User < ApplicationRecord
  attr_accessor :skip_password_validation
  # after_initialize :set_default_votes

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :votes
  has_many :favourites
  has_many :searches
  has_many :lists

  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships

  has_many :sent_friend_requests, :class_name => 'FriendRequest', :foreign_key => 'sender_id'
  has_many :pending_friend_requests, :class_name => 'FriendRequest', :foreign_key => 'recipient_id'
  has_many :credentials, dependent: :destroy
  validates_uniqueness_of :username, :unless => :unregistered?

  def reduce_votes_left
    current_votes = votes_left
    return false if current_votes <= 0

    update_attributes(votes_left: (current_votes - 1))
  end

  def reset_votes
    @amount = vote_reset_amount + votes_left
    self.votes_left = @amount
    puts save!
  end

  def set_default_votes
    update(votes_left: 100)
  end

  def self.replenish_votes
    User.all.each(&:reset_votes)
  end

  def unregistered?
    password.blank?
  end

  def send_invite_email!
    InvitedUserEmail.with(user: user).weekly_summary.deliver_now
  end

  protected

  def password_required?
    return false if skip_password_validation
    super
  end
end
