class User < ApplicationRecord
  has_and_belongs_to_many :rooms
  has_many :messages
end
