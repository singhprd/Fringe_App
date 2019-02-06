# frozen_string_literal: true

FactoryBot.define do
  factory :comment_vote do
    user nil
    comment nil
    vote 1
  end
end
