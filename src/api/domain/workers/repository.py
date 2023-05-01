from api.models.index import db, Workers, Company
from flask import request, jsonify


def create_work(company_id, user_id, working_schedule):
    new_work = Workers(user_id, company_id, working_schedule)
    db.session.add(new_work)
    db.session.commit()
    return new_work


def get_worker_list():
    all_workers = Company.query.all()
    serialized_workers = list(map(lambda worker: worker.serialize(), all_workers))
    return serialized_workers


# def get_worker_by_id_from_repo(worker_id):
#     return Workers.query.filter_by(id=worker_id).first()


def get_worker_by_id(company_id):
    worker = Workers.query.filter_by(id=company_id).first()
    return worker


def delete_worker(id):
    worker = Workers.query.get(id)
    if worker is not None:
        db.session.delete(worker)
        db.session.commit()
        return True
    else:
        return False
