from . import ma
from marshmallow import fields, validate

class AssignmentSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    description = fields.Str()
    due_date = fields.Date(required=True)
    status = fields.Str(validate=validate.OneOf(["pending", "completed"]))

assignment_schema = AssignmentSchema()
assignments_schema = AssignmentSchema(many=True)