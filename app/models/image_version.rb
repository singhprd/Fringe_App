class ImageVersion < ApplicationRecord
	belongs_to :image

	def remote_url
		"https:" + self.url
	end
end
