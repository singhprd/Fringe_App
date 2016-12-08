class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :votes
  has_many :favourites
  acts_as_commontator

  def reduce_votes_left()
  	current_votes = self.votes_left
    if current_votes <= 0
      return false
    else
  	   return self.update_attributes(votes_left: (current_votes - 1) )
    end
  end

  def reset_votes()
  	vote_reset_amount = self.vote_reset_amount
	   self.update_attributes(votes_left: vote_reset_amount )
  end

end
