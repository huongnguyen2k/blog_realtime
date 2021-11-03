class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string :full_name
      t.date :birthday
      t.integer :phone
      t.string :address
      t.string :intersts

      t.timestamps
    end
  end
end
