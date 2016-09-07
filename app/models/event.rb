class Event < ApplicationRecord
	has_many :performances
	has_many :reviews
	has_many :votes

	def count
		return 10	
	end

end
