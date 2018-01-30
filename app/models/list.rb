class List < ApplicationRecord
  has_many :list_items, -> { order(position: :asc) }, :dependent => :destroy
  has_many :events, :through => :list_items
  belongs_to :user
end
