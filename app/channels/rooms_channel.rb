# frozen_string_literal: true

# app/channels/chat_channel.rb
class RoomsChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber to this channel.
  def subscribed
    @room = Room.find_by(name: params[:room])
    stream_for @room
  end

  def receive(_data)
    RoomsChannel.broadcast_to(@room, room: @room, users: @room.users, messages: @room.messages)
  end

  def unsubscribed
    # cleanup
  end
end
