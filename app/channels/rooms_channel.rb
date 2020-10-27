# frozen_string_literal: true

# app/channels/chat_channel.rb
class RoomsChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber to this channel.
  def subscribed
    # add current_user to the room's list of users
    # since room/user pair is unique, this can't result
    # in duplicates
    current_user = connection.current_user
    @room = Room.find_by(name: params[:room])
    @room.users.append(current_user) unless @room.users.include?(current_user)
    stream_for @room
    RoomsChannel.broadcast_to(@room, room: @room, users: @room.users.pluck(:name), type: 'arrival', user: current_user.name)
  end

  def receive(data)
    RoomsChannel.broadcast_to(@room, room: @room, users: @room.users.pluck(:name), body: data['body'], sent_by: current_user.name, type: 'message')
  end

  def unsubscribed
    # remove current_user from the room's list of users
    current_user = connection.current_user
    @room.users.delete(current_user)
    RoomsChannel.broadcast_to(@room, room: @room, users: @room.users.pluck(:name), type: 'departure', user: current_user.name)
    stop_all_streams
  end
end
