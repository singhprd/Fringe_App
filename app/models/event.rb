class Event < ApplicationRecord
	has_many :performances
	has_many :reviews
end
