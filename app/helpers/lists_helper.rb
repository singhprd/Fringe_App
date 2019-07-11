# frozen_string_literal: true

module ListsHelper
  def user_list_action(user)
    content_tag(:a, "Remove!", {
      data: {
        action: "click->friend-list#removeUser",
        user_id: user.id,
      },
      style: "cursor: pointer;",
      class: "pull-right",
    })
  end
end
