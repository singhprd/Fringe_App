class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :event, presence: true
  validates :user, presence: true
  validates :text, presence: true
end
