json.extract! profile, :id, :full_name, :birthday, :phone, :address, :intersts, :created_at, :updated_at
json.url profile_url(profile, format: :json)
