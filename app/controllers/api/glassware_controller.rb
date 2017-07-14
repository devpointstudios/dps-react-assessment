class Api::GlasswareController < ApplicationController
  # brewery_db.glassware.all
  # brewery_db.glassware.find(1)

  def all
    send_response(brew_client.glassware.all)
  end
end
