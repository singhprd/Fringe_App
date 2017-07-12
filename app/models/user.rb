class User < ApplicationRecord
  after_initialize :set_default_votes

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :votes
  has_many :favourites
  acts_as_commontator

  def reduce_votes_left
    current_votes = votes_left
    return false if current_votes <= 0
    update_attributes(votes_left: (current_votes - 1))
  end

  def reset_votes
    vote_reset_amount = self.vote_reset_amount
    update_attributes(votes_left: vote_reset_amount)
  end

  def set_default_votes
    update(votes_left: 100)
  end
end
