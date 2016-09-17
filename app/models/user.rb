class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :votes

  def reduce_votes_left()
  	current_votes = self.votes_left
  	self.update_attributes(votes_left: (current_votes - 1) )
  end

  def reset_votes()
  	vote_reset_amount = self.vote_reset_amount
	self.update_attributes(votes_left: vote_reset_amount )
  end

end
