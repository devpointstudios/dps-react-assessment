class Api::LocationsController < ApplicationController
  # brewery_db.locations.all(locality: 'San Francisco')

  def all
    send_response(brew_client.locations.all(p: @page))
  end

  def by_city
    send_response(brew_client.locations.all(locality: params[:city], p: @page))
  end
end
