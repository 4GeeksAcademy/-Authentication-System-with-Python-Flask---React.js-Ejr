from api.models.index import db, Workers, Company
from flask import request, jsonify


def create_worker(company_id, user_id, working_schedule):
    new_work = Workers(user_id, company_id, working_schedule)
    db.session.add(new_work)
    db.session.commit()
    return new_work


def get_worker_by_id(worker_id):
    worker = Workers.query.get(worker_id)
    return worker


def get_list_worker_company(company_id):
    list_worker_by_company = Workers.query.filter_by(company_id=company_id).all()
    list_worker = list(map(lambda worker: worker.serialize(), list_worker_by_company))
    return list_worker


def delete_worker(id):
    worker = Workers.query.get(id)
    if worker is not None:
        db.session.delete(worker)
        db.session.commit()
        return True
    else:
        return False
