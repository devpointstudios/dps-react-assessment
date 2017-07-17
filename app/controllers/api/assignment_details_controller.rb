class Api::AssignmentDetailsController < ApplicationController
  def show
    `cp #{Rails.root}/README.md #{Rails.root}/public`
    render json: { file: File.read(Rails.root.join('public', 'README.md')) }
  end
end
