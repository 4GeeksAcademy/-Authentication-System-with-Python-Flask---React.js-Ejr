from flask import Flask, render_template, request, jsonify

#Need to create a website that takes all the important information for an event
#Do I need to secure it, because only promoters should be able to access to it

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
#create 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(100), nullable=False)
    event_address = db.Column(db.String(200), nullable=False)
    ticket_price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    event_image_path = db.Column(db.String(200), nullable=False)
    #Nice to have a follow buttom for this promoter

#Create the table where the information will be save
db.create_all()

# API endpoint for event creation 
#
@app.route('/api/create_event', methods=['POST'])
def create_event():
    title = request.form.get('event_name')
    address = request.form.get('event_address')
    ticket_price = float(request.form.get('ticket_price'))
    description = request.form.get('description')
    image = request.files.get('event_image')

    # The image path is being save so it can be display in the front
    image_path = f'static/images/{image.filename}'
    image.save(image_path)

    # Create a new event in the database
    new_event = Event(title=title, address=address, ticket_price=ticket_price,
                      description=description, image_path=image_path)
    db.session.add(new_event)
    db.session.commit()

#message for the user that the event was created succesfully, maybe we need a modal for this 
    return jsonify({'message': 'Event created successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)