# frozen_string_literal: true

# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber to this channel.
  def subscribed
    stream_from 'general'
  end

  def receive(data)
    ActionCable.server.broadcast(params[:room], data)
  end
end
