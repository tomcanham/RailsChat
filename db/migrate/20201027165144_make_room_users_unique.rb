class MakeRoomUsersUnique < ActiveRecord::Migration[6.0]
  def change
    def change
      add_index :rooms_users, [:room, :user], unique: true
    end
  end
end
