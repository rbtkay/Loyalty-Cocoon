import os
from dotenv import load_dotenv

project_folder = os.environ.get('NODE_ENV')
print(project_folder)
