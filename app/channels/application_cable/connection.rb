module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      print "Here we are!!"
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
    end
  end
end
