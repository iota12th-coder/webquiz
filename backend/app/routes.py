from flask import Blueprint, request, jsonify
from .models import User, Question, Result
from main import db, bcrypt

# Create a Blueprint
api_blueprint = Blueprint('api', __name__)

# --- Authentication Routes ---
@api_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(name=data['name'], mobile=data['mobile'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'New user created!'}), 201

@api_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(mobile=data['mobile']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Login successful!', 'user': {'name': user.name, 'mobile': user.mobile}})
    return jsonify({'message': 'Login failed! Check credentials.'}), 401

# --- Question Routes ---
@api_blueprint.route('/questions', methods=['GET'])
def get_questions():
    # For now, let's send all questions. Later you can randomize or select by exam type.
    questions = Question.query.all()
    output = []
    for q in questions:
        question_data = {
            'question': q.question_text,
            'options': [q.option_a, q.option_b, q.option_c, q.option_d],
            # Note: Don't send the correct answer to the client during the exam
        }
        output.append(question_data)
    return jsonify({'questions': output})

# --- Admin Route to Add Questions ---
@api_blueprint.route('/questions', methods=['POST'])
def add_question():
    data = request.get_json()
    new_question = Question(
        question_text=data['question'],
        option_a=data['optionA'],
        option_b=data['optionB'],
        option_c=data['optionC'],
        option_d=data['optionD'],
        correct_answer=data['correctAnswer']
    )
    db.session.add(new_question)
    db.session.commit()
    return jsonify({'message': 'Question added successfully!'}), 201

# --- Result Routes (Example) ---
@api_blueprint.route('/results', methods=['POST'])
def submit_result():
    # This is a simplified example. A real implementation would be more secure.
    data = request.get_json()
    # You would need to verify user identity (e.g., via tokens)
    # and calculate the score on the backend, not trust the client.
    new_result = Result(user_id=data['userId'], score=data['score'], total_questions=data['total'])
    db.session.add(new_result)
    db.session.commit()
    return jsonify({'message': 'Result saved!'}), 201

