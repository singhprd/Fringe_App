class Event < ApplicationRecord
	has_many :performances
	has_many :reviews
	has_many :votes
end
