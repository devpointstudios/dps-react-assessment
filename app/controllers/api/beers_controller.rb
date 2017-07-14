class Api::BeersController < ApplicationController
  # brewery_db.beers.all
  # brewery_db.beers.all(name: 'Coors Light')
  # brewery_db.beers.random

  def all
    send_response(brew_client.beers.all)
  end

  def by_name
    send_response(brew_client.beers.all(name: params[:name]))
  end

  def random
    send_response(brew_client.beers.random)
  end
end
