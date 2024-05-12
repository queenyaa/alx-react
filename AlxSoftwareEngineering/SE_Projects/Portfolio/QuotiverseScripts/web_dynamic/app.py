from flask import Flask, render_template, request, redirect, url_for, jsonify
import mysql.connector
import mysql.connector as mysql
from datetime import datetime

app = Flask(__name__, static_url_path='/static')


# Function to handle MySQL database connection
def connect_to_db():
    """ Connect to Quotiverse_db """
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="quote_dev",
            password="Quotiv1@2",
            database="quotiverse_db"
        )
        return conn
    except mysql.connector.Error as err:
        print(f"Failed to connect to MySQL: {err}")
        return None



@app.route('/', strict_slashes="False")
def home():
    """This is to render the home page"""
    return render_template('home.html')


@app.route('/register', methods=['GET', 'POST'], strict_slashes="False")
def register():
    """Render the register page"""
    if request.method == 'POST':
        # Get the data
        name = request.form['name']
        username = request.form['username']
        email = request.form['email']
        password_hash = request.form['password']
        created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Connect to the database
        conn = connect_to_db()
        if conn:
            cursor = conn.cursor()
            try:
                # Execute SQL query to insert user data into the database
                sql = "INSERT INTO users (name, username, email, password_hash, created_at) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(sql, (name, username, email, password_hash, created_at))
                # Commit the transaction
                conn.commit()
                cursor.close()
                conn.close()
                # Redirect to a welcome page after registration
                return redirect(url_for('user', name=name))
            except mysql.connector.Error as err:
                # Handle database errors
                print(f"Failed to execute SQL query: {err}")
                cursor.close()
                conn.close()
                # Redirect to an error page
                return render_template('error.html', error_message="An error occurred while registering the user.")
        else:
            # Redirect to an error page if unable to connect to the database
            return render_template('error.html', error_message="Failed to connect to the database.")
        return redirect(url_for('user', name=name))
    return render_template('register.html')


@app.route('/user', strict_slashes="Flase")
def welcome():
    """ Redirected from user login """
    return render_template('user.html')


@app.route('/login', strict_slashes="False")
def login():
    """Render the log in page"""
    return render_template('login.html')


if __name__ == '__main__':
    """Run the app"""
    app.run(host='0.0.0.0', port='5000', debug=True)