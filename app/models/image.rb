class Image < ApplicationRecord
	has_many :image_versions
	belongs_to :event
end
