class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  # before_action :authenticate_user!

  def check_admin
    raise "User is not Admin!" unless current_user.try(:admin?)
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |u|
      u.permit(
        :username, :email,
        :password, :password_confirmation,
        :remember_me
      )
    end
    devise_parameter_sanitizer.permit(:sign_in) do |u|
      u.permit(
        :username, :email,
        :password, :remember_me
      )
    end
    devise_parameter_sanitizer.permit(:account_update) do |u|
      u.permit(
        :username, :email,
        :password, :current_password
      )
    end
  end
end
