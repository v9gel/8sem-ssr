class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.text :body
      t.string :picture
      t.integer :levels
      t.integer :square
      t.references :material, foreign_key: true

      t.timestamps
    end
  end
end
