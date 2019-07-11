# frozen_string_literal: true

class List < ApplicationRecord
  has_many :list_items, -> { order(position: :asc) }, dependent: :destroy
  has_many :events, through: :list_items

  has_and_belongs_to_many :users

  # belongs_to :user
end
