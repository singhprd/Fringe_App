module SignInHelper
  def sign_in(user)
    post user_session_url(email: user.email, password: user.password)
  end
end