# frozen_string_literal: true

class List < ApplicationRecord
  has_many :list_items, -> { order(position: :asc) }, dependent: :destroy
  has_many :events, through: :list_items

  has_and_belongs_to_many :users

  # belongs_to :user

  def user_has_access?(user)
    users.include?(user)
  end

  def add_user(user)
    users << user
  end

  def remove_user(user, current_user)
    return false if user == current_user
    users.delete(user)
  end
end
