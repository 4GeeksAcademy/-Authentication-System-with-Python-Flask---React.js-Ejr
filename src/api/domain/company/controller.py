import api.domain.company.repository as Repository
import api.handle_response as Response
from api.functions import verify_user


def get_companies():
    resultado = Repository.get_companies()
    return Response.response_ok(resultado, "Get all companies", 201)

def register_company(data):

    new_company = verify_user(data)
    
    if new_company.get("error") is not None:
        return new_company

    return Repository.register_company(data, #se crea una empresa haciendo referencia a los campos de Company
        data['address'], 
        data['city'], 
        data['cp'], 
        data['cif']
        )
    
    
 