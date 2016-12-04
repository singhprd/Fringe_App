class Venue < ApplicationRecord
	validates :code, presence: true, uniqueness: true
	has_many :events
end
