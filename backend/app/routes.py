from flask import Blueprint, request, jsonify
from .models import Assignment
from .schemas import assignment_schema, assignments_schema
from . import db
from datetime import datetime, date

main = Blueprint("main", __name__)

# CREATE
@main.route("/assignments", methods=["POST"])
def create_assignment():
    data = request.json

    errors = assignment_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    assignment = Assignment(
        title=data["title"],
        description=data.get("description"),
        due_date=datetime.strptime(data["due_date"], "%Y-%m-%d"),
        status=data.get("status", "pending")
    )

    db.session.add(assignment)
    db.session.commit()

    return assignment_schema.jsonify(assignment), 201


# READ (with overdue logic)
@main.route("/assignments", methods=["GET"])
def get_assignments():
    assignments = Assignment.query.all()

    result = []
    for a in assignments:
        item = assignment_schema.dump(a)

        # 🔥 Overdue logic
        if a.status != "completed" and a.due_date < date.today():
            item["status"] = "overdue"

        result.append(item)

    return jsonify(result)


# UPDATE
@main.route("/assignments/<int:id>", methods=["PUT"])
def update_assignment(id):
    assignment = Assignment.query.get_or_404(id)
    data = request.json

    if "title" in data:
        assignment.title = data["title"]

    if "description" in data:
        assignment.description = data["description"]

    if "due_date" in data:
        assignment.due_date = datetime.strptime(data["due_date"], "%Y-%m-%d")

    if "status" in data:
        assignment.status = data["status"]

    db.session.commit()

    return assignment_schema.jsonify(assignment)


# DELETE
@main.route("/assignments/<int:id>", methods=["DELETE"])
def delete_assignment(id):
    assignment = Assignment.query.get_or_404(id)

    db.session.delete(assignment)
    db.session.commit()

    return jsonify({"message": "Deleted successfully"})