class ListItem < ApplicationRecord
  belongs_to :list
  has_one :event
end
