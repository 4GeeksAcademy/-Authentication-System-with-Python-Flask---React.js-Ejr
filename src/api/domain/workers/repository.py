from api.models.index import db, Workers

def create_worker(company_id, new_worker_id):
    new_worker = Workers(new_worker_id, company_id)
    db.session.add(new_worker)
    db.session.commit()
    return new_worker

def get_workers_by_company(company_id):
    workers_by_company = Workers.query.filter_by(company_id=company_id).all()
    return workers_by_company

def get_single_worker(worker_id):
    worker = Workers.query.get(worker_id)
    return worker

def delete_worker(worker):
    if worker:
        worker.user.is_active = False
        db.session.commit()
    else:
        return None

    return worker

def update_worker(update_worker, worker):
    if worker:
        worker.username = update_worker["username"]
        worker.firstname = update_worker["firstname"]
        worker.lastname = update_worker["lastname"]
        worker.email = update_worker["email"]
        worker.working_schedule = update_worker["working_schedule"]
        worker.password = update_worker["password"]
        db.session.commit()
        return service
    else: 
        return None