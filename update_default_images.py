import mysql.connector

# Database connection
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='dragonball',
    database='ai_optibuild'
)
cursor = conn.cursor()

# Default image URLs for each component type served from local server
default_images = {
    'processors': r'C:\Users\pp\Desktop\Ai-Optibuild\pc_builds\Images\processor.jpg',
    'power_supplies': r'C:\Users\pp\Desktop\Ai-Optibuild\pc_builds\Images\PSU.jpg',
    'storage': r'C:\Users\pp\Desktop\Ai-Optibuild\pc_builds\Images\storage.jpg',
    'cpu_coolers': r'C:\Users\pp\Desktop\Ai-Optibuild\pc_builds\Images\cpu_cooler.jpg',
    'pc_cases': r'C:\Users\pp\Desktop\Ai-Optibuild\pc_builds\Images\pc_case.jpg',
    'graphics_cards': r'C:\Users\pp\Desktop\Ai-Optibuild\pc_builds\Images\graphics_card.jpg',
    'motherboards': r'C:\Users\pp\Desktop\Ai-Optibuild\pc_builds\Images\motherboard.jpg',
    'ram': r'C:\Users\pp\Desktop\Ai-Optibuild\pc_builds\Images\ram.jpg'
}

# Update each table with its default image
for table, default_image_url in default_images.items():
    update_query = f"UPDATE {table} SET img = %s"
    cursor.execute(update_query, (default_image_url,))

# Commit and close
conn.commit()
cursor.close()
conn.close()

print("Default image URLs updated successfully for all tables")
