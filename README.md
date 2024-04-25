# Backend Assessment

## Installation and Setup
### Prerequisites
* Python 3.x installed on your system
* PostgreSQL installed

### Install Python
#### Windows
Download the latest Python installer for Windows from [Here](https://python.org).   
Run the installer and follow the instructions. Make sure to check the option to add Python to your system's PATH.

#### macOS
macOS usually comes with Python pre-installed. You can check the installed version by opening the Terminal and running:

```
python3 --version
```

If Python is not installed, you can install it using Homebrew by running:
```
brew install python
```

#### Linux
Most Linux distributions come with Python pre-installed. You can check the installed version by opening the Terminal and running:
```
python3 --version
```
If Python is not installed, you can install it using your package manager. For example, on Ubuntu, you can run:
```
sudo apt-get update
sudo apt-get install python3
```

### Install PostgreSQL
#### Windows
Download the latest PostgreSQL installer for Windows from [Here](https://postgresql.org).   
Run the installer and follow the instructions.

#### macOS
You can install PostgreSQL on macOS using Homebrew by running:
```
brew install postgresql
```

#### Linux
You can install PostgreSQL on Linux using your package manager. For example, on Ubuntu, you can run:
```
sudo apt-get update
sudo apt-get install postgresql
```

### Clone the Repository
Clone the repository to your local machine:
```
git clone https://github.com/ranjanlamsal/Ramailo-tech-assessment.git
```

## FOR Backend
### Create and Activate a Virtual Environment
#### Windows
```
cd Ramailo-tech-assessment
python -m venv venv
venv\Scripts\activate
```

#### macOS/Linux
```
cd Ramailo-tech-assessment
python3 -m venv venv
source venv/bin/activate
```

### Install Requirements
Install the required Python packages:
```
pip install -r requirements.txt
```

### Set Environment Variables

Create a .env file in the root directory of the project and add the following variables:
```
DATABASE_HOST=your_database_host
DATABASE_NAME=your_database_name
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
```

Replace your_database_host, your_database_name, your_database_user, and your_database_password with your PostgreSQL database details.

### Make necessary Migrations
Make migrations and migrate
```
python manage.py makemigrations
python manage.py migrate
```


### Run the Backend
Run following script to run the backend at specified port (eg: 8000)
```
python manage.py runserver 8000
```

## For Frontend
### Install dependencies
```
npm i
```

### Run the react app
```
npm start
```

## You have a server side application running at localhost:8000 and client side application running at localhost:3000. 
Try localhost:3000/login for login and get started